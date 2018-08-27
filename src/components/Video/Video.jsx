import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import StreamStore from '../../services/StreamStore';

class Video extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: null,
  }

  attachStream = (id, node) => {
    if (node) {
      node.srcObject = StreamStore.get(id); // eslint-disable-line
    }
  };

  render() {
    const { id, className } = this.props;

    return (
      <div className={className}>
        <video
          autoPlay
          key={id}
          ref={(c) => { this.attachStream(id, c); }}
        />
      </div>
    );
  }
}

export default Video;
