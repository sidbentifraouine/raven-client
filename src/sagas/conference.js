import SimpleMultiPeer from '@ok2ju/simple-multi-peer';
import { eventChannel } from 'redux-saga';
import { all, call, put, fork, take, takeEvery } from 'redux-saga/effects';
import {
  JOIN_ROOM,
  RECEIVED_STREAM,
  GET_LOCAL_VIDEO_STREAM_SUCCESS,
  PEER_DISCONNECTED,
} from '../actions';
import getVideoStream from '../services/videoStream';
import StreamStore from '../services/StreamStore';

function* watchMessageEventChannel(localStream, roomId) {
  const channel = eventChannel((emitter) => {
    const Peers = new SimpleMultiPeer({ // eslint-disable-line
      server: SIGNALING_URL,
      connectionOptions: {
        path: SIGNALING_PATH,
      },
      room: roomId,
      callbacks: {
        connect: (id) => {
          global.console.log('Peer connected: ', id);
        },
        close: (id) => {
          StreamStore.remove(id);
          emitter({ type: PEER_DISCONNECTED, payload: { id } });
        },
        data: (data) => {
          global.console.log(data);
        },
        stream: (id, stream) => {
          StreamStore.save(id, stream);
          emitter({ type: RECEIVED_STREAM, payload: { id } });
        },
      },
      peerOptions: {
        stream: localStream,
      },
    });

    return () => {};
  });

  while (true) {
    const message = yield take(channel);
    yield put(message);
  }
}

function* joinRoom(action) {
  const localStream = yield call(getVideoStream);
  yield call(StreamStore.save, 'me', localStream);
  yield put({ type: GET_LOCAL_VIDEO_STREAM_SUCCESS, payload: { id: 'me' } });
  yield fork(watchMessageEventChannel, localStream, action.payload.roomId);
}

export default function () {
  return all([
    takeEvery(JOIN_ROOM, joinRoom),
  ]);
}
