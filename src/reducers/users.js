import {
  LOCAL_STREAM_URL_RECEIVED,
  REMOTE_STREAM_URL_RECEIVED,
} from '../actions';

export const initialState = {
  localStreamURL: '',
  remoteStreamURL: '',
};

export function users(state = initialState, action) {
  switch (action.type) {
    case LOCAL_STREAM_URL_RECEIVED:
      return {
        ...state,
        localStreamURL: action.payload,
      };
    case REMOTE_STREAM_URL_RECEIVED:
      return {
        ...state,
        remoteStreamURL: action.payload,
      };
    default:
      return state;
  }
}
