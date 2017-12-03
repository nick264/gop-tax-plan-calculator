export const SET_CALCULATED_VALUES = 'SET_CALCULATED_VALUES'

import { calculateFromInputs } from '../utils/calculator'

export function calculateResults() {
  return((dispatch,getState) => {
    const { input } = getState()
    const data = calculateFromInputs(input)
    
    dispatch({
      type: SET_CALCULATED_VALUES,
      data: data
    })
  })
}