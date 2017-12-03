import { combineReducers } from 'redux'

import inputReducer from './reducers/input'
import calculateReducer from './reducers/calculate'

const rootReducer = combineReducers({
  input: inputReducer,
  calculate: calculateReducer
});

export default rootReducer;