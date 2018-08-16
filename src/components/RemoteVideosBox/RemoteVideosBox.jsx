import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import theme from './theme.css';

import StreamStore from '../../services/StreamStore';

class RemoteVideosBox extends PureComponent {
  static propTypes = {
    streamIds: PropTypes.array,
  };

  static defaultProps = {
    streamIds: [],
  };

  attachStream = (id, node) => {
    if (node) {
      node.srcObject = StreamStore.get(id); // eslint-disable-line
    }
  };

  render() {
    const { streamIds } = this.props;
    global.console.log('Remote videos [render]: ', streamIds);

    return (
      <div className={theme.remoteVideosBox}>
        {streamIds
          .filter(id => id !== 'me')
          .map((id, index) => (
            <video
              autoPlay
              key={index}
              ref={(c) => { this.attachStream(id, c); }}
            />
          ))}
      </div>
    );
  }
}

export default RemoteVideosBox;
