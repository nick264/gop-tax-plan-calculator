import {
  UI_REVEAL_RESULTS
} from '../actions/ui'

const inputReducer = (state={ resultsVisible: false},action) => {
  switch(action.type) {
    case UI_REVEAL_RESULTS:
      return Object.assign({}, state, {
        resultsVisible: true
      })
    default:
      return state
  }
}

export default inputReducer;