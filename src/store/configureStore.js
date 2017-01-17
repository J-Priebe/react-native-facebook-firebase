'use strict'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'


export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    applyMiddleware(thunk)
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}