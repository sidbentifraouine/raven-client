import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import theme from './theme.css';

class LargeVideo extends PureComponent {
  static propTypes = {
    stream: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={theme.largeVideo}>
        <video autoPlay src={this.props.stream} />
      </div>
    );
  }
}

export default LargeVideo;
