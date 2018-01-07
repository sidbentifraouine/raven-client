import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import theme from './theme.css';

class RemoteVideosBox extends PureComponent {
  static propTypes = {
    streams: PropTypes.array,
  };

  static defaultProps = {
    streams: [],
  };

  render() {
    return (
      <div className={theme.remoteVideosBox}>
        {this.props.streams.map((stream, index) => (
          <video
            autoPlay
            key={index}
            src={stream}
          />
        ))}
      </div>
    );
  }
}

export default RemoteVideosBox;
