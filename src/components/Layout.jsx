import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Layout extends PureComponent {
  static propTypes = {
    openConnection: PropTypes.func.isRequired,
    getVideoStream: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    children: PropTypes.node, // eslint-disable-line
  };

  componentDidMount() {
    this.props.openConnection('ws://localhost:3334');
    this.props.getVideoStream(this.props.params);
  }

  render() {
    return (
      <div>
        <h1>Fugee Multi-Peer Conference</h1>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
