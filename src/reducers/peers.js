import {
  RECEIVED_STREAM,
  PEER_DISCONNECTED,
  SET_ACTIVE_SPEAKER,
  SET_PINNED_SPEAKER
} from '../actions'
import myPeerId from '../constants'

export const initialState = {
  ids: [],
  activeSpeaker: myPeerId,
  pinnedSpeaker: null
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
    case SET_ACTIVE_SPEAKER:
      return {
        ...state,
        activeSpeaker: action.payload.id
      }
    case SET_PINNED_SPEAKER:
      return {
        ...state,
        pinnedSpeaker: action.payload.id
      }
    default:
      return state
  }
}
