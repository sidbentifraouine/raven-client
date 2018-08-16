import React, { Component } from 'react'; // Note: we use `Component` here just to re-render
import PropTypes from 'prop-types';
import theme from './theme.css';

import StreamStore from '../../services/StreamStore';

class LargeVideo extends Component {
  static propTypes = {
    streamId: PropTypes.string,
  };

  static defaultProps = {
    streamId: 'me',
  };

  attachStream = (node) => {
    if (node) {
      const stream = StreamStore.get(this.props.streamId);
      node.srcObject = stream; // eslint-disable-line
    }
  };

  render() {
    return (
      <div className={theme.largeVideo}>
        <video
          autoPlay
          ref={(c) => { this.attachStream(c); }}
        />
      </div>
    );
  }
}

export default LargeVideo;
