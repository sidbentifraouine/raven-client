import React, { PureComponent } from 'react';
import TextField from '../TextField';
import Button from '../Button';
import history from '../../services/history';
import theme from './theme.css';

class Login extends PureComponent {
  state = {
    room: '',
  };

  handleChange = (value) => {
    this.setState({ room: value });
  };

  handleEnterClick = () => {
    history.push(`/${this.state.room}`);
  };

  render() {
    return (
      <div className={theme.login}>
        <TextField
          value={this.state.room}
          placeholder="Please enter room id"
          onChange={this.handleChange}
        />
        <Button
          title="Enter"
          onClick={this.handleEnterClick}
          disabled={!this.state.room}
        />
      </div>
    );
  }
}

export default Login;
