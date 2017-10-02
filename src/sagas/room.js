import { eventChannel } from 'redux-saga';
import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import {
  WS_MESSAGE_RECEIVED,
  WS_MESSAGE_SEND,
  PEER_STREAM_ADDED,
  WS_PEER_CONNECTED,
  GET_VIDEO_STREAM,
} from '../actions';
import iceConfig from '../config/iceConfig';
import { createListener } from './helpers';
import getVideoStream from '../services/videoStream';
import { WS_MESSAGE_TYPES } from '../constants';

const peerConnections = {};
let currentId;
let roomId; // eslint-disable-line
let connected = false;
let stream;

const createPeerConnectionEmitter = (id, pc) => (emitter) => {
  // eslint-disable-next-line
  pc.onicecandidate = (event) => {
    global.console.log('Received new icecandidate', event.candidate);
    emitter({
      type: WS_MESSAGE_SEND,
      payload: {
        namespace: WS_MESSAGE_TYPES.MSG,
        message: { by: currentId, to: id, ice: event.candidate, type: WS_MESSAGE_TYPES.ICE },
      },
    });
  };

  // eslint-disable-next-line
  pc.onaddstream = (event) => {
    global.console.log('Received new stream', event.stream);
    emitter({
      type: PEER_STREAM_ADDED,
      payload: { id, stream: URL.createObjectURL(event.stream) },
    });
  };

  return () => {
    global.console.log('[createPeerConnectionEmitter] - unsubscribed');
  };
};

function* getPeerConnection(id) {
  if (peerConnections[id]) {
    return peerConnections[id];
  }

  const pc = new RTCPeerConnection(iceConfig);
  peerConnections[id] = pc;
  pc.addStream(stream);

  const channel = eventChannel(createPeerConnectionEmitter(id, pc));
  yield fork(createListener(channel));

  return pc;
}

function* makeOffer({ payload }) {
  const pc = yield* getPeerConnection(payload.id);
  const offer = yield call([pc, pc.createOffer]);
  yield call([pc, pc.setLocalDescription], offer);
  yield call(global.console.log, 'Creating an offer for', payload.id);

  yield put({
    type: WS_MESSAGE_SEND,
    payload: {
      namespace: WS_MESSAGE_TYPES.MSG,
      message: { by: currentId, to: payload.id, sdp: offer, type: WS_MESSAGE_TYPES.SDP_OFFER },
    },
  });
}

function* handleSdpOfferReceived(pc, offer, to) {
  yield call([pc, pc.setRemoteDescription], new RTCSessionDescription(offer));
  const answer = yield call([pc, pc.createAnswer]);
  yield call([pc, pc.setLocalDescription], answer);

  yield put({
    type: WS_MESSAGE_SEND,
    payload: {
      namespace: WS_MESSAGE_TYPES.MSG,
      message: { by: currentId, to, sdp: answer, type: WS_MESSAGE_TYPES.SDP_ANSWER },
    },
  });
}

function* handleSdpAnswerReceived(pc, answer) {
  yield call([pc, pc.setRemoteDescription], new RTCSessionDescription(answer));
  yield call(global.console.log, 'Setting remote description by answer');
}

function* handleIceCandidateReceived(pc, candidate) {
  if (candidate) {
    yield call(global.console.log, 'Adding ice candidates');
    yield call([pc, pc.addIceCandidate], new RTCIceCandidate(candidate));
  }
}

function* handleMessage(action) {
  const data = action.payload;
  const pc = yield* getPeerConnection(data.by);

  switch (data.type) {
    case WS_MESSAGE_TYPES.SDP_OFFER:
      yield call(handleSdpOfferReceived, pc, data.sdp, data.by);
      break;
    case WS_MESSAGE_TYPES.SDP_ANSWER:
      yield call(handleSdpAnswerReceived, pc, data.sdp);
      break;
    case WS_MESSAGE_TYPES.ICE:
      yield call(handleIceCandidateReceived, pc, data.ice);
      break;
    default:
      break;
  }
}

function* createRoom() {
  yield put({
    type: WS_MESSAGE_SEND,
    payload: {
      namespace: WS_MESSAGE_TYPES.INIT,
      message: null,
      callback: (roomid, id) => {
        roomId = roomid;
        currentId = id;
        connected = true;

        browserHistory.push(`/${roomid}`);
      },
    },
  });
}

function* joinRoom(room) {
  if (!connected) {
    yield put({
      type: WS_MESSAGE_SEND,
      payload: {
        namespace: WS_MESSAGE_TYPES.INIT,
        message: { room },
        callback: (roomid, id) => {
          currentId = id;
          roomId = roomid;
        },
      },
    });
    connected = true;
  }
}

function* requestVideoStream(action) {
  const params = action.payload;
  const localStream = yield call(getVideoStream);
  stream = localStream;
  window.localStream = URL.createObjectURL(localStream);

  if (!params.roomId) {
    yield call(createRoom);
  } else {
    yield call(joinRoom, params.roomId);
  }
}

export default function () {
  return all([
    takeEvery(WS_MESSAGE_RECEIVED, handleMessage),
    takeEvery(WS_PEER_CONNECTED, makeOffer),
    takeEvery(GET_VIDEO_STREAM, requestVideoStream),
  ]);
}
