import { combineReducers } from 'redux'

import inputReducer from './reducers/input'

const rootReducer = combineReducers({
  input: inputReducer
});

export default rootReducer;