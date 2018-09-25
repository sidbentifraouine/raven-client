import { connect } from 'react-redux'
import ActionsBar from '../components/ActionBar'
import {
  TOGGLE_MICROPHONE,
  TOGGLE_CAMERA,
  TOGGLE_SCREEN_SHARING,
  END_CALL
} from '../actions'

const mapStateToProps = state => ({
  isMicrophoneEnabled: state.actionsBar.isMicrophoneEnabled,
  isCameraEnabled: state.actionsBar.isCameraEnabled,
  isScreenSharingEnabled: state.actionsBar.isScreenSharingEnabled
})

const mapDispatchToProps = dispatch => ({
  toggleMicrophone: () => dispatch({ type: TOGGLE_MICROPHONE }),
  toggleCamera: () => dispatch({ type: TOGGLE_CAMERA }),
  toggleScreenSharing: () => dispatch({ type: TOGGLE_SCREEN_SHARING }),
  endCall: () => dispatch({ type: END_CALL })
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionsBar)
