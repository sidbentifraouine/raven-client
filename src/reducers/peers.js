import { GET_LOCAL_VIDEO_STREAM_SUCCESS, RECEIVED_STREAM } from '../actions';

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
    default:
      return state;
  }
}
