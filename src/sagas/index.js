import { all } from 'redux-saga/effects'
import room from './room'
import peer from './peer'

export default function * rootSaga () {
  yield all([
    room(),
    peer()
  ])
}
