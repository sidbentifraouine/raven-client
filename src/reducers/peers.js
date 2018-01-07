import { GET_LOCAL_VIDEO_STREAM_SUCCESS, RECEIVED_STREAM } from '../actions';

export const initialState = {
  entities: [],
};

export function peers(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_STREAM:
      return {
        ...state,
        entities: [...state.entities, action.payload],
      };
    case GET_LOCAL_VIDEO_STREAM_SUCCESS:
      return {
        ...state,
        entities: [action.payload, ...state.entities],
      };
    default:
      return state;
  }
}
