import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Layout extends PureComponent {
  static propTypes = {
    openConnection: PropTypes.func.isRequired,
    children: PropTypes.node, // eslint-disable-line
  };

  componentDidMount() {
    this.props.openConnection(SIGNALING_URL);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Layout;
