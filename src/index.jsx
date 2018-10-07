import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { Router, Route } from 'react-router'
import store from './store/configureStore'
import history from './services/history'
import './globalStyles'

import theme from './themes/default'

import Login from './components/Login'
import App from './containers/App'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Route path='/' component={Login} />
        <Route path=':roomId' component={App} />
        <Route path='/feedback' component={() => (<div>test</div>)} />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)
