import {
  UPDATE_INPUT_FIELD
} from '../actions/input'

const inputReducer = (state={},action) => {
  switch(action.type) {
    case UPDATE_INPUT_FIELD:
      let extraMergeValues = {}
      if(action.field == 'filingStatus') {
        if(action.value == 'single') {
          extraMergeValues.personalExemptions = 1
        }
        else {
          extraMergeValues.personalExemptions = 2 
        }
      }
      return Object.assign({}, state, {
        [action.field]: action.value
      }, extraMergeValues)
    default:
      return state
  }
}

export default inputReducer;