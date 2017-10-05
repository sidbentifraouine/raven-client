import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import store from './store/configureStore';
import history from './services/history';
import './common.css';

import Login from './containers/Login';
import Layout from './containers/Layout';
import Room from './containers/Room';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Login} />
        <Route path="/room" component={Room} >
          <Route path=":roomId" component={Room} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
