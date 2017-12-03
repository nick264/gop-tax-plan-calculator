import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../rootReducer'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState = {}) {    
  if (process.env.NODE_ENV !== 'production') {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
      ),
    )
  } else {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
      ),
    )
  }
}
