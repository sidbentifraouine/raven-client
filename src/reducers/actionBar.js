import {
  MUTE_SUCCESS,
  MUTE_ERROR,
  UNMUTE_SUCCESS,
  UNMUTE_ERROR,
  PAUSE_VIDEO_SUCCESS,
  PAUSE_VIDEO_ERROR,
  RESUME_VIDEO_SUCCESS,
  RESUME_VIDEO_ERROR
} from '../actions'

export const initialState = {
  isMicrophoneEnabled: true,
  isCameraEnabled: true
}

export function actionsBar (state = initialState, action) {
  switch (action.type) {
    case MUTE_SUCCESS:
      return {
        ...state,
        isMicrophoneEnabled: false
      }
    case MUTE_ERROR:
      return {} // store errors for showing them in the Toast
    case UNMUTE_SUCCESS:
      return {
        ...state,
        isMicrophoneEnabled: true
      }
    case UNMUTE_ERROR:
      return {}
    case PAUSE_VIDEO_SUCCESS:
      return {
        ...state,
        isCameraEnabled: false
      }
    case PAUSE_VIDEO_ERROR:
      return {}
    case RESUME_VIDEO_SUCCESS:
      return {
        ...state,
        isCameraEnabled: true
      }
    case RESUME_VIDEO_ERROR:
      return {}
    default:
      return state
  }
}
