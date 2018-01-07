import SimpleMultiPeer from '@ok2ju/simple-multi-peer';
import { eventChannel } from 'redux-saga';
import { all, call, put, fork, take, takeEvery } from 'redux-saga/effects';
import { JOIN_ROOM, RECEIVED_STREAM, GET_LOCAL_VIDEO_STREAM_SUCCESS } from '../actions';
import getVideoStream from '../services/videoStream';

function* watchMessageEventChannel(localStream, roomId) {
  const channel = eventChannel((emitter) => {
    const Peers = new SimpleMultiPeer({ // eslint-disable-line
      server: SIGNALING_URL,
      connectionOptions: {
        path: SIGNALING_PATH,
      },
      room: roomId,
      callbacks: {
        connect: () => {},
        close: () => {},
        data: (data) => { global.console.log(data); },
        stream: (id, stream) => {
          global.console.log(id, stream);
          emitter(URL.createObjectURL(stream));
        },
      },
      peerOptions: {
        stream: localStream,
      },
    });

    return () => {};
  });

  while (true) {
    const stream = yield take(channel);
    yield put({ type: RECEIVED_STREAM, payload: stream });
  }
}

function* joinRoom(action) {
  const localStream = yield call(getVideoStream);
  yield put({ type: GET_LOCAL_VIDEO_STREAM_SUCCESS, payload: URL.createObjectURL(localStream) });
  yield fork(watchMessageEventChannel, localStream, action.payload.roomId);
}

export default function () {
  return all([
    takeEvery(JOIN_ROOM, joinRoom),
  ]);
}
