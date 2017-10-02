import { connect } from 'react-redux';
import { WS_OPEN_PENDING, GET_VIDEO_STREAM } from '../actions';
import Layout from '../components/Layout';

const mapDispatchToProps = dispatch => ({
  openConnection: hostname => dispatch({ type: WS_OPEN_PENDING, payload: { hostname } }),
  getVideoStream: location => dispatch({ type: GET_VIDEO_STREAM, payload: location }),
});

export default connect(null, mapDispatchToProps)(Layout);
