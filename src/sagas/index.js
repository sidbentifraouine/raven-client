import { all } from 'redux-saga/effects'
import conference from './conference'

export default function * rootSaga () {
  yield all([
    conference()
  ])
}
