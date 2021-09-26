import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'

import logger from 'redux-logger'

import rootReducer from './root-reducer'

// setup middlewares
const middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

// create store
const store = createStore(rootReducer, applyMiddleware(...middlewares))

// persisted version of our store
const persistor = persistStore(store)

export { store, persistor }
