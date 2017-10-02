import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import theme from './theme.css';

class Login extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div
        className={theme.container}
      >
        <div className={theme.overlay} />
        <h1>Login</h1>
      </div>
    );
  }
}

export default Login;
