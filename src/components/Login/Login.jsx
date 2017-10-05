import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import Button from '../Button';
import theme from './theme.css';

class Login extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    joinRoom: PropTypes.func.isRequired,
  };

  state = {
    roomid: this.props.location.hash,
  };

  handleRoomIdChange = (roomid) => {
    this.setState({ roomid });
  };

  handleJoin = () => {
    global.console.log('[Login] - handle join room');
    this.props.joinRoom(this.state.roomid);
  };

  render() {
    return (
      <div
        className={theme.container}
      >
        <div className={theme.overlay} />
        <div className={theme.form}>
          <div className={theme.row}>
            <h1 className={theme.logo}>Fugee</h1>
          </div>
          <div className={theme.row}>
            <TextField
              value={this.state.roomid}
              onChange={this.handleRoomIdChange}
              placeholder="Enter room ID"
            />
          </div>
          <div className={theme.row}>
            <Button
              title="Join"
              onClick={this.handleJoin}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
