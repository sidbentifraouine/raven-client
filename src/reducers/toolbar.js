import {
  TOGGLE_CHAT,
  TOGGLE_CODE_EDITOR,
  OPEN_SETTINGS
} from '../actions'

export const initialState = {
  isChatOpen: false,
  isCodeEditorOpen: false,
  isSettingsOpen: false
}

export function toolbar (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHAT:
      return {
        ...initialState,
        isChatOpen: !state.isChatOpen
      }
    case TOGGLE_CODE_EDITOR:
      return {
        ...initialState,
        isCodeEditorOpen: !state.isCodeEditorOpen
      }
    case OPEN_SETTINGS:
      return {
        ...initialState,
        isSettingsOpen: true
      }
    default:
      return state
  }
}
