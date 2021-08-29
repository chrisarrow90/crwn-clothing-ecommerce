import { createStore, applyMiddleware } from 'react-redux'
import logger from 'redux-logger'

import rootReducer from './root-reducer'

// setup middlewares
const middlewares = [logger]

// create store
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
