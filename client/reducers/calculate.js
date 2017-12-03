import {
  SET_CALCULATED_VALUES
} from '../actions/calculate'

const calculateReducer = (state={},action) => {
  switch(action.type) {
    case SET_CALCULATED_VALUES:
      return Object.assign({}, state, action.data, {valid: true})
    default:
      return state
  }
}

export default calculateReducer;