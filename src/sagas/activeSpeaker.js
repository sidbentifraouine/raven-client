import { eventChannel } from 'redux-saga'
import { all, put, fork, take, takeEvery } from 'redux-saga/effects'
import hark from 'hark'
import {
  RECEIVED_STREAM,
  SET_ACTIVE_SPEAKER
} from '../actions'
import StreamStore from '../services/StreamStore'

function * createVolumeWatcher (peerId, speechEvents) {
  const channel = eventChannel((emitter) => {
    speechEvents.on('speaking', () => {
      console.log('peer with id:', peerId, 'is speaking now')
      emitter({ type: SET_ACTIVE_SPEAKER, payload: { id: peerId } })
    })

    speechEvents.on('stopped_speaking', () => {
      console.log('peer with id:', peerId, 'stopped speaking')
    })

    return () => {
      hark.stop()
    }
  })

  while (true) {
    const message = yield take(channel)
    yield put(message)
  }
}

function * initVolumeMeter (action) {
  try {
    const peerId = action.payload.id
    const stream = StreamStore.get(peerId)
    const speechEvents = hark(stream, {})

    yield fork(createVolumeWatcher, peerId, speechEvents) // investigate using spawn instead of fork
  } catch (error) {
    console.error('initVolumeMeter: ', error)
  }
}

export default function () {
  return all([
    takeEvery(RECEIVED_STREAM, initVolumeMeter)
  ])
}
