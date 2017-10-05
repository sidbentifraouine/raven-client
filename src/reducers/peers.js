import { PEER_STREAM_ADDED, GET_LOCAL_VIDEO_STREAM_SUCCESS } from '../actions';

export const initialState = {
  entities: [],
  localStream: '',
};

export function peers(state = initialState, action) {
  switch (action.type) {
    case PEER_STREAM_ADDED:
      return {
        ...state,
        entities: [...state.entities, action.payload],
      };
    case GET_LOCAL_VIDEO_STREAM_SUCCESS:
      return {
        ...state,
        localStream: action.payload.stream,
      };
    default:
      return state;
  }
}
