import {
  UPDATE_INPUT_FIELD
} from '../actions/input'

const inputReducer = (state={},action) => {
  switch(action.type) {
    case UPDATE_INPUT_FIELD:
      return Object.assign({}, state, {
        [action.field]: action.value
      })
    default:
      return state
  }
}

export default inputReducer;