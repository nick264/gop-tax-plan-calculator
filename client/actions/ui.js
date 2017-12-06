export const UI_REVEAL_RESULTS = 'UI_REVEAL_RESULTS'
export const UI_SHOW_DETAILS = 'UI_SHOW_DETAILS'
export const UI_SET_CHART_INCOME_SENSITIVITY_TYPE = 'UI_SET_CHART_INCOME_SENSITIVITY_TYPE'

export const UI_CHART_INCOME_SENSITIVITY_TYPE_ABS_DOLLARS = 'absolute_dollars'
export const UI_CHART_INCOME_SENSITIVITY_TYPE_DIFF_DOLLARS = 'diff_dollars'
export const UI_CHART_INCOME_SENSITIVITY_TYPE_ABS_RATE = 'absolute_rate'
export const UI_CHART_INCOME_SENSITIVITY_TYPE_DIFF_RATE = 'diff_rate'

export function revealResults() {
  return({
    type: UI_REVEAL_RESULTS
  })
}

export function showDetails() {
  return({
    type: UI_SHOW_DETAILS
  })  
}

export function setChartIncomeSensitivityType(type) {
  return({
    type: UI_SET_CHART_INCOME_SENSITIVITY_TYPE,
    value: type
  })
}