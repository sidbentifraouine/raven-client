import { eventChannel } from 'redux-saga';
import { all, call, put, fork, take, takeEvery } from 'redux-saga/effects';
import {
  WS_MESSAGE_SEND,
  WS_MESSAGE_RECEIVED,
  WS_MESSAGE_PROCEED_ERROR,
  JOIN_ROOM,
  LEAVE_ROOM,
  REMOTE_STREAM_URL_RECEIVED,
} from '../actions';
import { WS_MESSAGE_TYPES } from '../constants';
import { server, options } from '../config/servers';
import { trace } from '../services/logger';

const peers = {};

function createListener(channel) {
  return function* listen() {
    while (true) {
      const message = yield take(channel);
      yield put(message);
    }
  };
}

/* eslint-disable */
const createIcecandidateEmitter = (pc, userID, sdpType) => (emitter) => {
  pc.onicecandidate = function(event) {
    if (event.candidate) {
      peers[userID].candidates.push(event.candidate);
    } else {
      const message = JSON.stringify({
        type: sdpType,
        data: pc.localDescription,
        userID,
      });

      emitter({ type: WS_MESSAGE_SEND, payload: message });

      for (let i = 0; i < peers[userID].candidates.length; i++) { // eslint-disable-line
        const msg = JSON.stringify({
          type: WS_MESSAGE_TYPES.CANDIDATE,
          data: peers[userID].candidates[i],
          userID,
        });

        emitter({ type: WS_MESSAGE_SEND, payload: msg });
      }
    }
  };

  pc.oniceconnectionstatechange = function() { // eslint-disable-line
    if (pc.iceConnectionState === 'disconnected') {
      delete peers[userID];
    }
  };

  pc.onaddstream = function(event) { // eslint-disable-line
    emitter({
      type: REMOTE_STREAM_URL_RECEIVED,
      payload: URL.createObjectURL(event.steam),
    });
  };

  return () => {
    trace('createIcecandidateEmitter : return');
  };
};
/* eslint-enable */

function* initConnection(pc, id, sdpType) {
  yield call(global.console.log, 'initConnection', pc, id, sdpType);
  const channel = eventChannel(createIcecandidateEmitter(pc, id, sdpType));
  yield fork(createListener(channel));
}

function* createConnection(userID) {
  yield call(global.console.log, '[createConnection]', userID);
  if (!peers[userID]) {
    yield call(global.console.log, '[inside createConnection condition]');
    peers[userID] = {
      candidates: [],
    };

    const pc = new RTCPeerConnection(server, options);
    yield* initConnection(pc, userID, WS_MESSAGE_TYPES.ANSWER);

    peers[userID].connection = pc;
  }
}

function* handleNewUserJoined(userID) {
  yield call(global.console.log, 'handleNewUserJoined', userID);
  try {
    peers[userID] = {
      candidates: [],
    };

    // peer#2 joined (not initiator)
    const pc = new RTCPeerConnection(server, options);
    yield* initConnection(pc, userID, WS_MESSAGE_TYPES.OFFER);
    peers[userID].connection = pc;

    const stream = yield* navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    yield call(global.console.log, stream);
    // yield call([pc, pc.addStream], stream);

    yield call(global.console.log, 'after init called', peers);

    // OfferOptions there used just for debugging purpose
    // see https://stackoverflow.com/questions/27489881/webrtc-never-fires-onicecandidate
    // call with context (pc) [pc, pc.createOffer]
    const offer = yield call([pc, pc.createOffer], {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    yield call([pc, pc.setLocalDescription], offer);
  } catch (error) {
    yield call(global.console.log, 'initConnection error', error.message);
  }
}

function* remoteCandidateReceived(userID, data) {
  yield call(global.console.log, '[remoteCandidateReceived]', data);
  yield* createConnection(userID);
  const pc = peers[userID].connection;
  yield call([pc, pc.addIceCandidate], new RTCIceCandidate(data));
  yield call(global.console.log, '[remoteCandidateReceived] end', pc);
}

function* remoteOfferReceived(userID, data) {
  yield call(global.console.log, '[remoteOfferReceived]', data);
  yield* createConnection(userID);
  const pc = peers[userID].connection;

  yield call([pc, pc.setRemoteDescription], new RTCSessionDescription(data));
  const answer = yield call([pc, pc.createAnswer]);
  yield call([pc, pc.setLocalDescription], answer);
  yield call(global.console.log, '[remoteOfferReceived] end', pc);
}

function* remoteAnswerReceived(userID, data) {
  const pc = peers[userID].connection;
  yield call([pc, pc.setRemoteDescription], new RTCSessionDescription(data));
  yield call(global.console.log, '[remoteAnswerReceived] end', pc);
}

function* proceedMessage(action) {
  try {
    const message = yield call(JSON.parse, action.payload);
    switch (message.type) {
      case WS_MESSAGE_TYPES.JOIN_ROOM:
        yield call(handleNewUserJoined, message.userID);
        break;
      case WS_MESSAGE_TYPES.CANDIDATE:
        yield call(remoteCandidateReceived, message.userID, message.data);
        break;
      case WS_MESSAGE_TYPES.OFFER:
        yield call(remoteOfferReceived, message.userID, message.data);
        break;
      case WS_MESSAGE_TYPES.ANSWER:
        yield call(remoteAnswerReceived, message.userID, message.data);
        break;
      default:
        throw new Error(`Unknown message type ${message.type}`);
    }
  } catch (error) {
    yield put({ type: WS_MESSAGE_PROCEED_ERROR, payload: error.message });
  }
}

function* joinRoom(action) {
  const { userID, roomID } = action.payload;

  try {
    const message = JSON.stringify({
      type: WS_MESSAGE_TYPES.JOIN_ROOM,
      userID,
      roomID,
    });

    yield put({ type: WS_MESSAGE_SEND, payload: message });
  } catch (error) {
    global.console.log('Error:[joinRoom] - ', error.message);
  }
}

function* leaveRoom(action) {
  const { userID, roomID } = action.payload;

  try {
    const message = JSON.stringify({
      type: WS_MESSAGE_TYPES.LEAVE_ROOM,
      userID,
      roomID,
    });

    yield put({ type: WS_MESSAGE_SEND, payload: message });
  } catch (error) {
    global.console.log('Error:[leaveRoom] - ', error.message);
  }
}

export default function () {
  return all([
    takeEvery(WS_MESSAGE_RECEIVED, proceedMessage),
    takeEvery(JOIN_ROOM, joinRoom),
    takeEvery(LEAVE_ROOM, leaveRoom),
  ]);
}
