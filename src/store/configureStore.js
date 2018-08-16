import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas';

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  /* eslint-disable no-underscore-dangle */
  // because of http://zalmoxisus.github.io/redux-devtools-extension/#1.1-basic-store
  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && (
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: 'Raven',
          })
        )
        : compose
    );
  /* eslint-enable no-underscore-dangle */

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
  );

  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
};

export default initStore();
