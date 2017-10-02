import { connect } from 'react-redux';
import Room from '../components/Room';

const mapStateToProps = state => ({
  peers: state.users.peers,
});

export default connect(mapStateToProps, null)(Room);
