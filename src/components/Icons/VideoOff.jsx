import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class VideoOffIcon extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string
  };

  static defaultProps = {
    width: 24,
    height: 24,
    fill: '#fff'
  };

  render () {
    const { width, height, fill } = this.props

    return (
      <svg
        fill={fill}
        height={height}
        viewBox='0 0 24 24'
        width={width}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 0h24v24H0zm0 0h24v24H0z'
          fill='none'
        />
        <path
          d='M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z'
        />
      </svg>
    )
  }
}

export default VideoOffIcon
