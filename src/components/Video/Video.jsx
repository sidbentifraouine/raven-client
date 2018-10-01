import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StreamStore from '../../services/StreamStore'

const StyledVideo = styled.video``

class Video extends PureComponent {
  static propTypes = {
    peerId: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    className: '',
    onClick: () => {}
  }

  attachStream = (id, node) => {
    if (node) {
      node.srcObject = StreamStore.get(id)
    }
  }

  render () {
    return (
      <StyledVideo
        autoPlay
        className={this.props.className}
        innerRef={(c) => { this.attachStream(this.props.peerId, c) }}
        onClick={this.props.onClick}
      />
    )
  }
}

export default Video
