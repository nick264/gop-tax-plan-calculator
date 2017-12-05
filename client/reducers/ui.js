import {
  UI_REVEAL_RESULTS,
  UI_SHOW_DETAILS,
  UI_TOGGLE_CHART_EFFECTIVE_RATE
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
    case UI_TOGGLE_CHART_EFFECTIVE_RATE:
      return Object.assign({}, state, {
        chartEffectiveRate: action.value
      })
    default:
      return state
  }
}

export default inputReducer;