import { connect } from 'react-redux';
import {
  WS_OPEN_PENDING,
  JOIN_ROOM,
} from '../actions';
import Room from '../components/Room';

const mapStateToProps = state => ({
  localStreamURL: state.users.localStreamURL,
  remoteStreamURL: state.users.remoteStreamURL,
});

const mapDispatchToProps = dispatch => ({
  openConnection: hostname => dispatch({ type: WS_OPEN_PENDING, payload: { hostname } }),
  joinRoom: (userID, roomID) => dispatch({ type: JOIN_ROOM, payload: { userID, roomID } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
