import React, { Component } from 'react';
import PropTypes from 'prop-types';
import theme from './theme.css';

import Video from '../Video';

class RemoteVideosBox extends Component {
  static propTypes = {
    streamIds: PropTypes.array,
    setActivePeer: PropTypes.func.isRequired,
    setPinnedPeer: PropTypes.func.isRequired,
    pinnedPeer: PropTypes.string,
  };

  static defaultProps = {
    streamIds: [],
    pinnedPeer: null,
  };

  render() {
    const {
      streamIds,
      setActivePeer,
      setPinnedPeer,
      pinnedPeer,
    } = this.props;
    global.console.log('Remote videos [render]: ', streamIds);

    return (
      <div className={theme.remoteVideosBox}>
        {streamIds
          .filter(id => id !== 'me')
          .map(id => (
            <Video
              id={id}
              key={id}
              streamIds={streamIds}
              setActivePeer={setActivePeer}
              pinnedPeer={pinnedPeer}
              setPinnedPeer={setPinnedPeer}
            />
          ))}
      </div>
    );
  }
}

export default RemoteVideosBox;
