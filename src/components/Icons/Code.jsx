import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class CodeIcon extends PureComponent {
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
          d='M0 0h24v24H0V0z'
          fill='none'
        />
        <path
          d='M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'
        />
      </svg>
    )
  }
}

export default CodeIcon
