import { connect } from 'react-redux';
import { WS_OPEN_PENDING, JOIN_ROOM } from '../actions';
import Login from '../components/Login';

const mapDispatchToProps = dispatch => ({
  openConnection: hostname => dispatch({ type: WS_OPEN_PENDING, payload: { hostname } }),
  joinRoom: room => dispatch({ type: JOIN_ROOM, payload: { room } }),
});

export default connect(null, mapDispatchToProps)(Login);
