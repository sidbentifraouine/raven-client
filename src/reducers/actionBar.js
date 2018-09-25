import {
  TOGGLE_MICROPHONE,
  TOGGLE_CAMERA,
  TOGGLE_SCREEN_SHARING
} from '../actions'

export const initialState = {
  isMicrophoneEnabled: true,
  isCameraEnabled: true,
  isScreenSharingEnabled: false
}

export function actionsBar (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MICROPHONE:
      return {
        ...state,
        isMicrophoneEnabled: !state.isMicrophoneEnabled
      }
    case TOGGLE_CAMERA:
      return {
        ...state,
        isCameraEnabled: !state.isCameraEnabled
      }
    case TOGGLE_SCREEN_SHARING:
      return {
        ...state,
        isScreenSharingEnabled: !state.isScreenSharingEnabled
      }
    default:
      return state
  }
}
