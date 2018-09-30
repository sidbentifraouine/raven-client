import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Video from '../Video'

const RemoteVideosBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 20px;
  top: 20px;
`

const RemoteVideo = styled(Video)`
  object-fit: cover;
  transform: scaleX(-1);
  width: 120px;
  margin-bottom: 15px;
`

class RemoteVideosBox extends Component {
  static propTypes = {
    streamIds: PropTypes.array,
    setPinnedSpeaker: PropTypes.func.isRequired,
    pinnedSpeaker: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  };

  static defaultProps = {
    streamIds: []
  };

  render () {
    const { streamIds, setPinnedSpeaker, pinnedSpeaker } = this.props

    return (
      <RemoteVideosBoxContainer>
        {streamIds
          .filter(id => id !== 'me')
          .map(id => (
            <RemoteVideo
              id={id}
              pinnedSpeaker={pinnedSpeaker}
              setPinnedSpeaker={setPinnedSpeaker}
            />
          ))}
      </RemoteVideosBoxContainer>
    )
  }
}

export default RemoteVideosBox
