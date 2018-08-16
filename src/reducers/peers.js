import {
  GET_LOCAL_VIDEO_STREAM_SUCCESS,
  RECEIVED_STREAM,
  PEER_DISCONNECTED,
} from '../actions';

export const initialState = {
  ids: [],
};

export function peers(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_STREAM:
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    case GET_LOCAL_VIDEO_STREAM_SUCCESS:
      return {
        ...state,
        ids: [action.payload.id, ...state.ids],
      };
    case PEER_DISCONNECTED:
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id),
      };
    default:
      return state;
  }
}
