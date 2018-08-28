import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import StreamStore from '../../services/StreamStore';
import hark from '../../utils/hark/hark';

class Video extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    streamIds: PropTypes.array.isRequired,
    setActivePeer: PropTypes.func.isRequired,
    setPinnedPeer: PropTypes.func.isRequired,
    pinnedPeer: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: null,
    pinnedPeer: null,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ peers: nextProps.streamIds }, () => {
      this.state.peers.forEach((peerId) => {
        const speech = hark(StreamStore.get(peerId), {});
        speech.on('speaking', () => {
          global.console.log('Speaking!', peerId);
          this.props.setActivePeer(this.props.pinnedPeer || peerId);
        });
        speech.on('stopped_speaking', () => {
          global.console.log('stopped_speaking!', peerId);
        });
      });
    });
  }

  attachStream = (id, node) => {
    if (node) {
      node.srcObject = StreamStore.get(id); // eslint-disable-line
    }
  };

  handleClick = id => () => {
    this.props.setActivePeer(id);
    if (this.props.pinnedPeer !== id) {
      this.props.setPinnedPeer(id);
    } else {
      this.props.setPinnedPeer(null);
    }
  }

  render() {
    const { id, className } = this.props;

    return (
      <div className={className}>
        <video
          autoPlay
          ref={(c) => { this.attachStream(id, c); }}
          onClick={this.handleClick(id)}
        />
      </div>
    );
  }
}

export default Video;
