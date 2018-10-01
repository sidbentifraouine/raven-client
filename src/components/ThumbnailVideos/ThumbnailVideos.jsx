import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Video from '../Video'

const ThumbnailVideosContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 20px;
  top: 20px;
`

const StyledVideo = styled(Video)`
  object-fit: cover;
  transform: scaleX(-1);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid lightgreen;
`

class ThumbnailVideos extends PureComponent {
  static propTypes = {
    peers: PropTypes.array,
    setPinnedPeer: PropTypes.func.isRequired,
    pinnedPeerId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  };

  static defaultProps = {
    peers: [],
    pinnedPeerId: null
  };

  handleThumbnailClick = peerId => {
    if (this.props.pinnedPeerId !== peerId) {
      this.props.setPinnedPeer(peerId)
    } else {
      this.props.setPinnedPeer(null)
    }
  }

  render () {
    const { peers } = this.props

    return (
      <ThumbnailVideosContainer>
        {peers
          .map((peerId, index) => (
            <StyledVideo
              key={`${peerId}-${index}`}
              peerId={peerId}
              onClick={() => this.handleThumbnailClick(peerId)}
            />
          ))}
      </ThumbnailVideosContainer>
    )
  }
}

export default ThumbnailVideos
