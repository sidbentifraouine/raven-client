import { all } from 'redux-saga/effects'
import room from './room'
import peer from './peer'
import activePeer from './activePeer'

export default function * rootSaga () {
  yield all([
    room(),
    peer(),
    activePeer()
  ])
}
