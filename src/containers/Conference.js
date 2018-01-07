import { connect } from 'react-redux';
import { JOIN_ROOM } from '../actions';
import Conference from '../components/Conference';

const mapStateToProps = state => ({
  peers: state.peers.entities,
  localStream: state.peers.localStream,
});

const mapDispatchToProps = dispatch => ({
  joinRoom: roomId => dispatch({ type: JOIN_ROOM, payload: { roomId } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conference);
