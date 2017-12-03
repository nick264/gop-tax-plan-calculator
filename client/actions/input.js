export const UPDATE_INPUT_FIELD = 'UPDATE_INPUT_FIELD'

export function updateInputField(field,value) {
  return({
    type: UPDATE_INPUT_FIELD,
    field: field,
    value: value
  })
}