import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

class Room extends PureComponent {
  static propTypes = {
    localStreamURL: PropTypes.string.isRequired,
    remoteStreamURL: PropTypes.string.isRequired,
    openConnection: PropTypes.func.isRequired,
    joinRoom: PropTypes.func.isRequired,
  };

  static defaultProps = {
    connectedPeersCount: 0,
    link: 'http://fugee/6c84fb90-12c4-11e1-840d-7b25c5ee775a',
  };

  state = {
    roomID: uuidv1(),
  };

  componentDidMount() {
    this.props.openConnection('ws://localhost:3334');
  }

  handleRoomIDChange = (event) => {
    const roomID = event.target.value;
    this.setState({ roomID });
  };

  handleJoinRoom = () => {
    this.props.joinRoom(uuidv1(), this.state.roomID);
  };

  render() {
    return (
      <div>
        <div>
          <video
            className="local"
            src={this.props.localStreamURL}
            style={{ border: '1px solid #000', marginRight: '15px' }}
          >
            <track kind="captions" />
          </video>
          <video
            className="remote"
            src={this.props.remoteStreamURL}
            style={{ border: '1px solid #000' }}
          >
            <track kind="captions" />
          </video>
        </div>
        <div>
          <input value={this.state.roomID} onChange={this.handleRoomIDChange} />
          <button onClick={this.handleJoinRoom}>Join room</button>
        </div>
      </div>
    );
  }
}

export default Room;
