import {
  UI_REVEAL_RESULTS,
  UI_SHOW_DETAILS,
  UI_SET_CHART_INCOME_SENSITIVITY_TYPE,
  UI_CHART_INCOME_SENSITIVITY_TYPE_DIFF_DOLLARS
} from '../actions/ui'

const uiReducer = (state={
    resultsVisible: false,
    detailsVisible: false,
    chartIncomeSensitivityType: UI_CHART_INCOME_SENSITIVITY_TYPE_DIFF_DOLLARS 
  },action) => {
  switch(action.type) {
    case UI_REVEAL_RESULTS:
      return Object.assign({}, state, {
        resultsVisible: true
      })
    case UI_SHOW_DETAILS:
      return Object.assign({}, state, {
        detailsVisible: true
      })
    case UI_SET_CHART_INCOME_SENSITIVITY_TYPE:
      return Object.assign({}, state, {
        chartIncomeSensitivityType: action.value
      })
    default:
      return state
  }
}

export default uiReducer;