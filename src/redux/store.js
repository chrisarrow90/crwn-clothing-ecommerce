import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import rootReducer from './root-reducer'

// setup middlewares
const middlewares = [logger]

// create store
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
