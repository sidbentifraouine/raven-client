import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Room extends PureComponent {
  static propTypes = {
    connectedPeersCount: PropTypes.number,
    link: PropTypes.string.isRequired,
  };

  static defaultProps = {
    connectedPeersCount: 0,
  };

  render() {
    return (
      <div>
        <h1>Connected peers: {this.props.connectedPeersCount}</h1>
        <textarea />
        <h4>Room link: {this.props.link}</h4>
        <div />
      </div>
    );
  }
}

export default Room;
