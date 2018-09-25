import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Mic from '../Icons/Mic'
import MicOff from '../Icons/MicOff'
import Video from '../Icons/Video'
import VideoOff from '../Icons/VideoOff'
import ShareScreen from '../Icons/ShareScreen'
import CallEnd from '../Icons/CallEnd'
import theme from './theme.css'

class ActionsBar extends PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool,
    isMicrophoneEnabled: PropTypes.bool,
    isCameraEnabled: PropTypes.bool,
    isScreenSharingEnabled: PropTypes.bool,
    toggleMicrophone: PropTypes.func.isRequired,
    toggleCamera: PropTypes.func.isRequired,
    toggleScreenSharing: PropTypes.func.isRequired,
    endCall: PropTypes.func.isRequired
  };

  static defaultProps = {
    isVisible: false,
    isMicrophoneEnabled: false,
    isCameraEnabled: false,
    isScreenSharingEnabled: false
  };

  render () {
    const {
      isVisible,
      toggleMicrophone,
      isMicrophoneEnabled,
      toggleCamera,
      isCameraEnabled,
      toggleScreenSharing,
      isScreenSharingEnabled,
      endCall
    } = this.props

    return (
      <div
        className={cx(theme.actionBar, {
          [theme.visible]: isVisible
        })}
      >
        <ul className={theme.items}>
          <li
            onClick={toggleMicrophone}
            className={cx(theme.item, {
              [theme.active]: !isMicrophoneEnabled
            })}
          >
            {isMicrophoneEnabled ? <Mic /> : <MicOff />}
          </li>
          <li
            onClick={toggleCamera}
            className={cx(theme.item, {
              [theme.active]: !isCameraEnabled
            })}
          >
            {isCameraEnabled ? <Video /> : <VideoOff />}
          </li>
          <li
            onClick={toggleScreenSharing}
            className={cx(theme.item, {
              [theme.active]: isScreenSharingEnabled
            })}
          >
            <ShareScreen />
          </li>
          <li
            onClick={endCall}
            className={theme.item}
          >
            <CallEnd />
          </li>
        </ul>
      </div>
    )
  }
}

export default ActionsBar
