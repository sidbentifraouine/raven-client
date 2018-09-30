import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import StreamStore from '../../services/StreamStore'

const VideoContainer = styled.div``

const StyledVideo = styled.video``

class Video extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    setPinnedSpeaker: PropTypes.func,
    pinnedSpeaker: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  }

  static defaultProps = {
    className: '',
    setPinnedSpeaker: () => {}
  }

  attachStream = (id, node) => {
    if (node) {
      node.srcObject = StreamStore.get(id) // eslint-disable-line
    }
  };

  handleSetPinnedSpeaker = id => () => {
    if (this.isSpeakerAlreadyPinned()) {
      this.props.setPinnedSpeaker(null)
    } else {
      this.props.setPinnedSpeaker(id)
    }
  }

  isSpeakerAlreadyPinned = () => (
    this.props.id === this.props.pinnedSpeaker
  )

  render () {
    const { id, className } = this.props

    return (
      <VideoContainer>
        <StyledVideo
          className={className}
          autoPlay
          key={id}
          innerRef={(c) => { this.attachStream(id, c) }}
          onClick={this.handleSetPinnedSpeaker(id)}
        />
      </VideoContainer>
    )
  }
}

export default Video
