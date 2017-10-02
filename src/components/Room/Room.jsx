import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import theme from './theme.css';

class Room extends PureComponent {
  static propTypes = {
    peers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        stream: PropTypes.string,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div>
        <div>
          <video
            autoPlay
            className={theme.vidBox}
            src={window.localStream}
          >
            <track kind="captions" />
          </video>
          {this.props.peers.map(peer => (
            <video
              autoPlay
              key={peer.id}
              className={peer.id}
              src={peer.stream}
              style={{ border: '1px solid #000', marginRight: '15px' }}
            >
              <track kind="captions" />
            </video>
          ))}
        </div>
      </div>
    );
  }
}

export default Room;
