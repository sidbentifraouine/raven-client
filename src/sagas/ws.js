import { eventChannel } from 'redux-saga';
import {
  all,
  call,
  put,
  spawn,
  take,
  cancel,
  fork,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import {
  WS_OPEN_PENDING,
  WS_OPEN_SUCCESS,
  WS_OPEN_ERROR,
  WS_DISCONNECTED,
  WS_MESSAGE_SEND,
  WS_MESSAGE_RECEIVED,
  WS_PEER_CONNECTED,
  WS_PEER_DISCONNECTED,
} from '../actions';
import webSocketAPI from '../services/ws';
import { createListener } from './helpers';

const createSocketEmitter = socket => (emitter) => {
  webSocketAPI.onMessage(socket, (message) => {
    emitter({ type: WS_MESSAGE_RECEIVED, payload: message });
  });

  webSocketAPI.onPeerConnected(socket, (params) => {
    emitter({ type: WS_PEER_CONNECTED, payload: { id: params.id } });
  });

  webSocketAPI.onPeerDisconnected(socket, (data) => {
    emitter({ type: WS_PEER_DISCONNECTED, payload: data });
  });

  webSocketAPI.onDisconnect(socket, () => {
    emitter({ type: WS_DISCONNECTED });
  });

  return () => webSocketAPI.close(socket);
};

function createSender(socket) {
  return function* sendMessage(action) {
    yield call(
      webSocketAPI.send,
      socket,
      action.payload.namespace,
      action.payload.message,
      action.payload.callback,
    );
  };
}

function* waitForClose(ws, sender, listener) {
  yield take([WS_DISCONNECTED]);
  yield cancel(sender);
  yield cancel(listener);
}

function* openConnection(action) {
  try {
    const socket = yield call(webSocketAPI.open, action.payload.hostname);
    yield put({ type: WS_OPEN_SUCCESS, payload: socket });
    const channel = eventChannel(createSocketEmitter(socket));
    const sender = yield takeEvery(WS_MESSAGE_SEND, createSender(socket));
    const listener = yield fork(createListener(channel));
    yield spawn(waitForClose, socket, sender, listener);
  } catch (error) {
    yield put({ type: WS_OPEN_ERROR, payload: error.message });
  }
}

export default function () {
  return all([
    takeLatest(WS_OPEN_PENDING, openConnection),
  ]);
}
