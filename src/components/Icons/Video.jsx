import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class VideoIcon extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
  };

  static defaultProps = {
    width: 24,
    height: 24,
    fill: '#fff',
  };

  render() {
    const { width, height, fill } = this.props;

    return (
      <svg
        fill={fill}
        height={height}
        viewBox="0 0 24 24"
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0h24v24H0z"
          fill="none"
        />
        <path
          d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
        />
      </svg>
    );
  }
}

export default VideoIcon;
