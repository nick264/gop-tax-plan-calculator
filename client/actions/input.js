export const UPDATE_INPUT_FIELD = 'UPDATE_INPUT_FIELD'

const INTEGER_FIELDS = [
  'grossIncome',
  'mortgageInterest',
  'charitableDonations',
  'stateLocalPropertyTaxes',
  'stateLocalIncomeTaxes',
  'personalExemptions',
  'dependentChildrenCount'
]

export function updateInputField(field,value) {
  if(INTEGER_FIELDS.find((x) => field == x)){
    if(!value) {
      value = 0
    }
    else {
      value = parseInt(value)
    }
  }
  
  return({
    type: UPDATE_INPUT_FIELD,
    field: field,
    value: value
  })
}