import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LargeVideo from '../LargeVideo';
import RemoteVideosBox from '../RemoteVideosBox';
import theme from './theme.css';

class Conference extends PureComponent {
  static propTypes = {
    peers: PropTypes.array.isRequired,
    joinRoom: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.joinRoom(this.props.params.roomId);
  }

  // Toggle toolboxes
  handleMouseMove = () => {};

  render() {
    return (
      <div
        className={theme.conference}
        onMouseMove={this.handleMouseMove}
      >
        <LargeVideo stream={this.props.peers[0]} />
        <RemoteVideosBox streams={this.props.peers} />
      </div>
    );
  }
}

export default Conference;
