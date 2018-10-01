import {
  RECEIVED_STREAM,
  PEER_DISCONNECTED,
  SET_ACTIVE_PEER,
  SET_PINNED_PEER,
  END_CALL
} from '../actions'

export const initialState = {
  ids: [],
  activePeerId: null,
  pinnedPeerId: null
}

export function peers (state = initialState, action) {
  switch (action.type) {
    case RECEIVED_STREAM:
      return {
        ...state,
        ids: [...state.ids, action.payload.id]
      }
    case PEER_DISCONNECTED:
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id)
      }
    case SET_ACTIVE_PEER:
      return {
        ...state,
        activePeerId: action.payload.id
      }
    case SET_PINNED_PEER:
      return {
        ...state,
        pinnedPeerId: action.payload.id
      }
    case END_CALL:
      return initialState
    default:
      return state
  }
}
