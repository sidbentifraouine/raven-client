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
    const { streamIds } = this.props;
    global.console.log('Remote videos [render]: ', streamIds);

    return (
      <div className={theme.remoteVideosBox}>
        {streamIds
          .filter(id => id !== 'me')
          .map(id => (
            <Video id={id} />
          ))}
      </div>
    );
  }
}

export default RemoteVideosBox;
