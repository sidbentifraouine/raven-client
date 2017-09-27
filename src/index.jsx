import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';

import Room from './containers/Room';

ReactDOM.render(
  <Provider store={store}>
    <Room />
  </Provider>,
  document.getElementById('app'),
);
