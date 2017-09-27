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
  WS_CLOSE,
  WS_MESSAGE_SEND,
  WS_MESSAGE_RECEIVED,
} from '../actions';
import webSocketAPI from '../services/wsNew';

const createSocketEmitter = ws => (emitter) => {
  webSocketAPI.onMessage(ws, (message) => {
    emitter({ type: WS_MESSAGE_RECEIVED, payload: message.data });
  });

  webSocketAPI.onClose(ws, (reason) => {
    emitter({ type: WS_CLOSE, payload: reason });
  });

  return () => webSocketAPI.close(ws);
};

function createSender(ws) {
  return function* sendMessage(action) {
    yield call(webSocketAPI.send, ws, action.payload);
  };
}

function createListener(channel) {
  return function* listen() {
    while (true) {
      const message = yield take(channel);
      yield put(message);
    }
  };
}

function* waitForClose(ws, sender, listener) {
  yield take([WS_CLOSE]);
  yield cancel(sender);
  yield cancel(listener);
}

function* openConnection(action) {
  try {
    const ws = yield call(webSocketAPI.open, action.payload.hostname);
    yield put({ type: WS_OPEN_SUCCESS });
    const channel = eventChannel(createSocketEmitter(ws));
    const sender = yield takeEvery(WS_MESSAGE_SEND, createSender(ws));
    const listener = yield fork(createListener(channel));
    yield spawn(waitForClose, ws, sender, listener);
  } catch (error) {
    yield put({ type: WS_OPEN_ERROR });
  }
}

export default function () {
  return all([
    takeLatest(WS_OPEN_PENDING, openConnection),
  ]);
}
