import React from 'react'
import NumberFormat from 'react-number-format'

const FormatAmount = ({value, pctOrAbs, prefix}) => {
  prefix = prefix || ''
  
  if(pctOrAbs) {
    return(
      <NumberFormat thousandSeparator={true} displayType='text' value={value * 100} prefix={prefix} suffix='%' fixedDecimalScale={true} decimalScale={1}/>
    )
  }
  else {
    return(
      <NumberFormat thousandSeparator={true} displayType='text' value={value} prefix={prefix + '$'} decimalScale={0}/>
    )
  }
}

export default FormatAmount