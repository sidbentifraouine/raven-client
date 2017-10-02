import { put, take } from 'redux-saga/effects';

export function createListener(channel) {
  return function* listen() {
    while (true) {
      const message = yield take(channel);
      yield put(message);
    }
  };
}

export default createListener;
