import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Chat from '../Icons/Chat';
import Code from '../Icons/Code';
import Settings from '../Icons/Settings';
import theme from './theme.css';

class ToolBar extends PureComponent {
  static propTypes = {
    isChatOpen: PropTypes.bool.isRequired,
    isCodeEditorOpen: PropTypes.bool.isRequired,
    isSettingsOpen: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool,
    toggleChat: PropTypes.func.isRequired,
    toggleCodeEditor: PropTypes.func.isRequired,
    openSettings: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isVisible: false,
  };

  render() {
    const {
      isVisible,
      toggleChat,
      isChatOpen,
      toggleCodeEditor,
      isCodeEditorOpen,
      openSettings,
      isSettingsOpen,
    } = this.props;

    return (
      <div
        className={cx(theme.toolbar, {
          [theme.visible]: isVisible,
        })}
      >
        <ul className={theme.items}>
          <li
            onClick={toggleChat}
            className={cx(theme.item, {
              [theme.active]: isChatOpen,
            })}
          >
            <Chat />
          </li>
          <li
            onClick={toggleCodeEditor}
            className={cx(theme.item, {
              [theme.active]: isCodeEditorOpen,
            })}
          >
            <Code />
          </li>
          <li
            onClick={openSettings}
            className={cx(theme.item, {
              [theme.active]: isSettingsOpen,
            })}
          >
            <Settings />
          </li>
        </ul>
      </div>
    );
  }
}

export default ToolBar;
