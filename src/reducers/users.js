import { PEER_STREAM_ADDED } from '../actions';

export const initialState = {
  peers: [],
};

export function users(state = initialState, action) {
  switch (action.type) {
    case PEER_STREAM_ADDED:
      return {
        ...state,
        peers: [...state.peers, action.payload],
      };
    default:
      return state;
  }
}
