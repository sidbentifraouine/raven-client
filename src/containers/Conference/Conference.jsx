import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Video from '../../components/Video'
import RemoteVideosBox from '../../components/RemoteVideosBox'
import ActionsBar from '../ActionBar'

const TOOLBAR_REVEAL_DISTANCE = 100
const ACTIONSBAR_REVEAL_DISTANCE = 150
const HIDE_CONTROLS_TIMEOUT = 2000

const ConferenceContainer = styled.div`
  user-select: none;
  height: 100%;
  width: 100%;
  position: relative;
`

const LocalVideo = styled(Video)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
  transform: scaleX(-1);
  user-select: none;
`

class Conference extends PureComponent {
  static propTypes = {
    peers: PropTypes.array.isRequired,
    activeSpeaker: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    pinnedSpeaker: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    joinRoom: PropTypes.func.isRequired,
    setPinnedSpeaker: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  state = {
    isControlsVisible: false
  };

  componentWillMount () {
    this.props.joinRoom(this.props.params.roomId)
  }

  handleMouseMove = (event) => {
    this.isMouseNearToolBar_ = this.isMouseNearToolBar(event)
    this.isMouseNearActionsBar_ = this.isMouseNearActionsBar(event)

    if (this.isMouseNearToolBar_ || this.isMouseNearActionsBar_) {
      this.setState({ isControlsVisible: true })
    }

    this.hideControlsAfterTimeout()
  };

  isMouseNearToolBar = event => (
    event.pageX < TOOLBAR_REVEAL_DISTANCE
  );

  isMouseNearActionsBar = event => (
    event.pageY > window.innerHeight - ACTIONSBAR_REVEAL_DISTANCE
  );

  hideControls = () => {
    if (this.isMouseNearToolBar_ || this.isMouseNearActionsBar_) {
      return
    }

    this.setState({ isControlsVisible: false })
  };

  hideControlsAfterTimeout = () => {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout)
    }

    this.controlsTimeout = setTimeout(this.hideControls, HIDE_CONTROLS_TIMEOUT)
  };

  render () {
    const { peers, activeSpeaker, setPinnedSpeaker, pinnedSpeaker } = this.props
    const { isControlsVisible } = this.state

    return (
      <ConferenceContainer
        onMouseMove={this.handleMouseMove}
      >
        <LocalVideo id={!pinnedSpeaker && activeSpeaker} />
        <RemoteVideosBox
          streamIds={peers}
          pinnedSpeaker={pinnedSpeaker}
          setPinnedSpeaker={setPinnedSpeaker}
        />
        <ActionsBar
          isVisible={isControlsVisible}
        />
      </ConferenceContainer>
    )
  }
}

export default Conference
