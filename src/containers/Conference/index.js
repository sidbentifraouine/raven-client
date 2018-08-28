import { connect } from 'react-redux';
import {
  JOIN_ROOM,
  SET_ACTIVE_PEER,
  SET_PINNED_PEER,
} from '../../actions';
import Conference from './Conference';

const mapStateToProps = state => ({
  peers: state.peers.ids,
  activePeer: state.peers.activePeer,
  pinnedPeer: state.peers.pinnedPeer,
});

const mapDispatchToProps = dispatch => ({
  joinRoom: roomId => dispatch({ type: JOIN_ROOM, payload: { roomId } }),
  setActivePeer: activePeer => dispatch({ type: SET_ACTIVE_PEER, payload: { activePeer } }),
  setPinnedPeer: pinnedPeer => dispatch({ type: SET_PINNED_PEER, payload: { pinnedPeer } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conference);
