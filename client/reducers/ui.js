import {
  UI_REVEAL_RESULTS,
  UI_SHOW_DETAILS
} from '../actions/ui'

const inputReducer = (state={ resultsVisible: false, detailsVisible: false },action) => {
  switch(action.type) {
    case UI_REVEAL_RESULTS:
      return Object.assign({}, state, {
        resultsVisible: true
      })
    case UI_SHOW_DETAILS:
      return Object.assign({}, state, {
        detailsVisible: true
      })
    default:
      return state
  }
}

export default inputReducer;