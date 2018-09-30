import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
import rootSaga from '../sagas'

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Raven' })
        : compose
    )

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )

  const store = createStore(reducers, enhancer)
  sagaMiddleware.run(rootSaga)

  return store
}

export default initStore()
