import React, { Component } from 'react'; // Note: we use `Component` here just to re-render
import PropTypes from 'prop-types';
import StreamStore from '../../services/StreamStore';
import hark from '../../utils/hark/hark';
import myPeerId from '../../constants';
import theme from './theme.css';


class LargeVideo extends Component {
  static propTypes = {
    streamId: PropTypes.string,
    streamIds: PropTypes.array.isRequired,
    setActivePeer: PropTypes.func.isRequired,
    pinnedPeer: PropTypes.string,
  };

  static defaultProps = {
    streamId: myPeerId,
    pinnedPeer: null,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.pinnedPeer) {
      this.setState({ peers: nextProps.streamIds }, () => {
        this.state.peers.forEach((peerId) => {
          const speech = hark(StreamStore.get(peerId), {});
          speech.on('speaking', () => {
            global.console.log('Speaking!', peerId);
            this.props.setActivePeer(peerId);
          });
          speech.on('stopped_speaking', () => {
            global.console.log('stopped_speaking!', peerId);
          });
        });
      });
    }
  }

  attachStream = (node) => {
    if (node) {
      const stream = StreamStore.get(this.props.streamId);
      node.srcObject = stream; // eslint-disable-line
    }
  };

  render() {
    return (
      <div className={theme.largeVideo}>
        <video
          autoPlay
          ref={(c) => { this.attachStream(c); }}
        />
      </div>
    );
  }
}

export default LargeVideo;
