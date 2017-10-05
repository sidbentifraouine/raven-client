import { connect } from 'react-redux';
import Room from '../components/Room';
import { GET_LOCAL_VIDEO_STREAM_PENDING } from '../actions';

const mapStateToProps = state => ({
  peers: state.peers.entities,
  localStream: state.peers.localStream,
});

const mapDispatchToProps = dispatch => ({
  requestMediaStream: () => dispatch({ type: GET_LOCAL_VIDEO_STREAM_PENDING }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
