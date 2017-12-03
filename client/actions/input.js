export const UPDATE_INPUT_FIELD = 'UPDATE_INPUT_FIELD'

import { calculateResults } from './calculate'


export function updateInputField(field,value) {
  return({
    type: UPDATE_INPUT_FIELD,
    field: field,
    value: value
  })
}

export function updateInputFieldAndRecalculate(field,value) {
  return((dispatch,getState) => {
    dispatch({
      type: UPDATE_INPUT_FIELD,
      field: field,
      value: value
    })
    
    dispatch(calculateResults())
  })
}