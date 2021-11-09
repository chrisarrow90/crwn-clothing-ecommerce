import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { fetchCollectionsStart } from './shop/shop.sagas'

import rootReducer from './root-reducer'

// setup middlewares
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

// create store
const store = createStore(rootReducer, applyMiddleware(...middlewares))

// saga
sagaMiddleware.run(fetchCollectionsStart)

// persisted version of our store
const persistor = persistStore(store)

export { store, persistor }
