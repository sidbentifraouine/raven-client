import '@babel/polyfill'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store/configureStore'
import './globalStyles'

import theme from './themes/default'

import Login from './components/Login'
import App from './containers/App'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Login} />
          <Route path='/room/:roomId' component={App} />
          <Route path='/feedback' component={() => (<div>test</div>)} />
        </Fragment>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)
