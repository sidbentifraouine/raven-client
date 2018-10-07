import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Mic from '../Icons/Mic'
import MicOff from '../Icons/MicOff'
import Video from '../Icons/Video'
import VideoOff from '../Icons/VideoOff'
import CallEnd from '../Icons/CallEnd'

const ActionBarContainer = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.darkGray};
  border-radius: 3px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
  overflow: hidden;
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`

const ActionBarList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`

const ActionBarListItem = styled.li.attrs({
  className: props => props.isActive ? 'active' : ''
})`
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.theme.colors.darkGray};
  }

  &.active {
    background: ${props => props.theme.colors.lightBlue};
  }
`

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
      <ActionBarContainer isVisible={isVisible}>
        <ActionBarList>
          <ActionBarListItem
            isActive={!isMicrophoneEnabled}
            onClick={isMicrophoneEnabled ? muteMicrophone : unmuteMicrophone}
          >
            {isMicrophoneEnabled ? <Mic /> : <MicOff />}
          </ActionBarListItem>
          <ActionBarListItem
            isActive={!isCameraEnabled}
            onClick={isCameraEnabled ? pauseVideo : resumeVideo}
          >
            {isCameraEnabled ? <Video /> : <VideoOff />}
          </ActionBarListItem>
          <ActionBarListItem
            onClick={endCall}
          >
            <CallEnd />
          </ActionBarListItem>
        </ActionBarList>
      </ActionBarContainer>
    )
  }
}

export default ActionsBar
