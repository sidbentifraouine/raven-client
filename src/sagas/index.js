import { all } from 'redux-saga/effects';
import ws from './ws';
import room from './room';

export default function* rootSaga() {
  yield all([
    ws(),
    room(),
  ]);
}
