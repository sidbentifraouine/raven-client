import { all } from 'redux-saga/effects';
import ws from './ws';
import rtc from './rtc';

export default function* rootSaga() {
  yield all([
    ws(),
    rtc(),
  ]);
}
