import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store/configureStore';

// import Login from './components/Login';
import Layout from './containers/Layout';
import Room from './containers/Room';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route
        path="/"
        component={Layout}
      >
        <Route
          path=":roomId"
          component={Room}
        />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
