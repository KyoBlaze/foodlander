// @flow
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { createLogger } from 'redux-logger';

import reducers, { blacklist } from './modules';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const config = {
  key: 'root',
  storage,
  blacklist,
};

export default function configureStore() {
  const enhancer = compose(applyMiddleware(thunk, reduxPackMiddleware, logger));
  const store = createStore(persistCombineReducers(config, reducers), enhancer);
  const persistor = persistStore(store);
  persistor.purge();
  if (isDebuggingInChrome) {
    window.store = store;
  }

  return { persistor, store };
}