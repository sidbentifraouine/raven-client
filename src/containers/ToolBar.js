import { connect } from 'react-redux';
import {
  TOGGLE_CHAT,
  TOGGLE_CODE_EDITOR,
  OPEN_SETTINGS,
} from '../actions';
import ToolBar from '../components/ToolBar';

const mapStateToProps = state => ({
  isChatOpen: state.toolbar.isChatOpen,
  isCodeEditorOpen: state.toolbar.isCodeEditorOpen,
  isSettingsOpen: state.toolbar.isSettingsOpen,
});

const mapDispatchToProps = dispatch => ({
  toggleChat: () => dispatch({ type: TOGGLE_CHAT }),
  toggleCodeEditor: () => dispatch({ type: TOGGLE_CODE_EDITOR }),
  openSettings: () => dispatch({ type: OPEN_SETTINGS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
