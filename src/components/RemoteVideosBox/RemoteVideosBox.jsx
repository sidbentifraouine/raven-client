import React, { Component } from 'react'
import PropTypes from 'prop-types'
import theme from './theme.css'

import Video from '../Video'

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
    global.console.log('Remote videos [render]: ', streamIds)

    return (
      <div className={theme.remoteVideosBox}>
        {streamIds
          .filter(id => id !== 'me')
          .map(id => (
            <Video
              id={id}
              pinnedSpeaker={pinnedSpeaker}
              setPinnedSpeaker={setPinnedSpeaker}
            />
          ))}
      </div>
    )
  }
}

export default RemoteVideosBox
