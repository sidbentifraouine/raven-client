import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import store from './store/configureStore'
import history from './services/history'
import './common.css'

import Login from './components/Login'
import Conference from './containers/Conference'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Login} />
      <Route path=':roomId' component={Conference} />
    </Router>
  </Provider>,
  document.getElementById('app')
)
