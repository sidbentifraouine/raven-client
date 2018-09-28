import { all } from 'redux-saga/effects'
import room from './room'
import peer from './peer'
import activeSpeaker from './activeSpeaker'

export default function * rootSaga () {
  yield all([
    room(),
    peer(),
    activeSpeaker()
  ])
}
