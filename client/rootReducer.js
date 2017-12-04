import { combineReducers } from 'redux'

import inputReducer from './reducers/input'
import uiReducer from './reducers/ui'

const rootReducer = combineReducers({
  input: inputReducer,
  ui: uiReducer
});

export default rootReducer;