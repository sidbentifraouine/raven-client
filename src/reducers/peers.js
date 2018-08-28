import {
  GET_LOCAL_VIDEO_STREAM_SUCCESS,
  RECEIVED_STREAM,
  PEER_DISCONNECTED,
  SET_ACTIVE_PEER,
  SET_PINNED_PEER,
} from '../actions';
import myPeerId from '../constants';

export const initialState = {
  ids: [],
  activePeer: myPeerId,
  pinnedPeer: null,
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
    case SET_ACTIVE_PEER:
      return {
        ...state,
        activePeer: action.payload.activePeer,
      };
    case SET_PINNED_PEER:
      return {
        ...state,
        pinnedPeer: action.payload.pinnedPeer,
      };
    default:
      return state;
  }
}
