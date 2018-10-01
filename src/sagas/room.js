import SimpleMultiPeer from '@ok2ju/simple-multi-peer'
import { eventChannel } from 'redux-saga'
import { all, call, put, fork, take, takeLatest } from 'redux-saga/effects'
import {
  JOIN_ROOM_PENDING,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_ERROR,

  RECEIVED_STREAM,
  PEER_CONNECTED,
  PEER_DISCONNECTED,

  SET_ACTIVE_PEER,
  END_CALL
} from '../actions'
import getLocalStream from '../services/localStream'
import StreamStore from '../services/StreamStore'
import history from '../services/history'
import myPeerId from '../constants'

function * initWebRTC (localStream, roomId) {
  const channel = eventChannel((emitter) => {
    const Peers = new SimpleMultiPeer({ // eslint-disable-line
      server: SIGNALING_URL,
      connectionOptions: {
        path: SIGNALING_PATH
      },
      room: roomId,
      callbacks: {
        connect: (id) => {
          global.console.log('Peer connected: ', id)
          emitter({ type: PEER_CONNECTED, payload: { id } })
        },
        close: (id) => {
          StreamStore.remove(id)
          emitter({ type: PEER_DISCONNECTED, payload: { id } })
        },
        data: (data) => {
          global.console.log(data)
        },
        stream: (id, stream) => {
          StreamStore.save(id, stream)
          emitter({ type: RECEIVED_STREAM, payload: { id } })
        }
      },
      peerOptions: {
        stream: localStream
      }
    })

    return () => {}
  })

  while (true) {
    const message = yield take(channel)
    yield put(message)
  }
}

function * joinRoom (action) {
  try {
    const localStream = yield call(getLocalStream)
    yield call(StreamStore.save, myPeerId, localStream)
    yield put({ type: RECEIVED_STREAM, payload: { id: myPeerId } })
    yield put({ type: SET_ACTIVE_PEER, payload: { id: myPeerId } })
    yield fork(initWebRTC, localStream, action.payload.roomId)
    yield put({ type: JOIN_ROOM_SUCCESS })
  } catch (error) {
    yield put({ type: JOIN_ROOM_ERROR, payload: { error: error.message } })
  }
}

function endCall () {
  try {
    const localStreamTracks = StreamStore.get(myPeerId).getTracks()
    localStreamTracks.forEach((track) => {
      track.stop()
    })
    StreamStore.clear()
    history.push('/feedback')
  } catch (error) {
    console.error('endCall error:', error)
  }
}

export default function () {
  return all([
    takeLatest(JOIN_ROOM_PENDING, joinRoom),
    takeLatest(END_CALL, endCall)
  ])
}
