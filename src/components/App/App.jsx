import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Video from '../Video'
import ThumbnailVideos from '../../containers/ThumbnailVideos'
import ActionBar from '../../containers/ActionBar'

import { Tabs, Tab } from '../Tabs'

const TABS_REVEAL_DISTANCE = 150
const ACTIONBAR_REVEAL_DISTANCE = 150
const HIDE_CONTROLS_TIMEOUT = 2000

const AppContainer = styled.div`
  user-select: none;
  height: 100%;
  width: 100%;
  position: relative;
`

const MainVideo = styled(Video)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
  transform: scaleX(-1);
  user-select: none;
`

class App extends PureComponent {
  static propTypes = {
    activePeerId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    pinnedPeerId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    joinRoom: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  state = {
    index: 0,
    isControlsVisible: false
  };

  componentWillMount () {
    this.props.joinRoom(this.props.params.roomId)
  }

  handleTabChange = (index) => {
    this.setState({ index })
  }

  handleMouseMove = (event) => {
    this.isMouseNearTabs_ = this.isMouseNearTabs(event)
    this.isMouseNearActionsBar_ = this.isMouseNearActionsBar(event)

    if (this.isMouseNearTabs_ || this.isMouseNearActionsBar_) {
      this.setState({ isControlsVisible: true })
    }

    this.hideControlsAfterTimeout()
  };

  isMouseNearTabs = event => (
    event.pageY < TABS_REVEAL_DISTANCE
  );

  isMouseNearActionsBar = event => (
    event.pageY > window.innerHeight - ACTIONBAR_REVEAL_DISTANCE
  );

  hideControls = () => {
    if (this.isMouseNearTabs_ || this.isMouseNearActionsBar_) {
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
    const { activePeerId, pinnedPeerId } = this.props
    const { index, isControlsVisible } = this.state

    return (
      <AppContainer onMouseMove={this.handleMouseMove}>
        <Tabs
          index={index}
          onChange={this.handleTabChange}
        >
          <Tab label='Conference'>
            <MainVideo peerId={!pinnedPeerId ? activePeerId : pinnedPeerId} />
            <ThumbnailVideos />
            <ActionBar isVisible={isControlsVisible} />
          </Tab>
          <Tab label='Code Editor'>
            <h1>Code Editor</h1>
          </Tab>
        </Tabs>
      </AppContainer>
    )
  }
}

export default App
