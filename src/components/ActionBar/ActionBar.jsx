import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Mic from '../Icons/Mic'
import MicOff from '../Icons/MicOff'
import Video from '../Icons/Video'
import VideoOff from '../Icons/VideoOff'
import CallEnd from '../Icons/CallEnd'
import theme from './theme.css'

class ActionsBar extends PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool,
    isMicrophoneEnabled: PropTypes.bool,
    isCameraEnabled: PropTypes.bool,
    muteMicrophone: PropTypes.func.isRequired,
    unmuteMicrophone: PropTypes.func.isRequired,
    pauseVideo: PropTypes.func.isRequired,
    resumeVideo: PropTypes.func.isRequired,
    endCall: PropTypes.func.isRequired
  };

  static defaultProps = {
    isVisible: false,
    isMicrophoneEnabled: false,
    isCameraEnabled: false
  };

  render () {
    const {
      isVisible,
      isMicrophoneEnabled,
      isCameraEnabled,
      muteMicrophone,
      unmuteMicrophone,
      pauseVideo,
      resumeVideo,
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
            onClick={isMicrophoneEnabled ? muteMicrophone : unmuteMicrophone}
            className={cx(theme.item, {
              [theme.active]: !isMicrophoneEnabled
            })}
          >
            {isMicrophoneEnabled ? <Mic /> : <MicOff />}
          </li>
          <li
            onClick={isCameraEnabled ? pauseVideo : resumeVideo}
            className={cx(theme.item, {
              [theme.active]: !isCameraEnabled
            })}
          >
            {isCameraEnabled ? <Video /> : <VideoOff />}
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
