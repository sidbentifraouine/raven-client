import { connect } from 'react-redux';
import { WS_OPEN_PENDING } from '../actions';
import Layout from '../components/Layout';

const mapDispatchToProps = dispatch => ({
  openConnection: hostname => dispatch({ type: WS_OPEN_PENDING, payload: { hostname } }),
});

export default connect(null, mapDispatchToProps)(Layout);
