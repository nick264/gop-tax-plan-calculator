import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

// import formatNumber from 'format-number'
import NumberFormat from 'react-number-format'

import { calculateFromInputs } from '../utils/calculator'

import { Table } from 'semantic-ui-react'

const FormatImpact = ({value, absOrPct}) => {  
  let color = null
  let prefix = ''
  
  if(value < 0) {
    color = '#1ebc30'
  }
  else if(value > 0) {
    color = '#db2828'
    prefix = '+'
  }
  else {
    color = '#aaa'
  }
  
  return(
    <strong style={{color: color}}>
      (
        {
          absOrPct ?
            <NumberFormat thousandSeparator={true} displayType='text' value={value} prefix={prefix + '$'} decimalScale={0}/>
          :
            <NumberFormat thousandSeparator={true} displayType='text' value={value * 100} prefix={prefix} suffix='%' fixedDecimalScale={true} decimalScale={1}/>
        } 
      )
    </strong>
  )
  
}

const Result = ({input}) => {
  const resultsCurrent = calculateFromInputs(input,'Current')
  const resultsHouse = calculateFromInputs(input,'House')
  const resultsSenate = calculateFromInputs(input,'Senate')
  
  const houseTaxImpact = ( resultsHouse.TotalTax - resultsCurrent.TotalTax )
  const senateTaxImpact = ( resultsSenate.TotalTax - resultsCurrent.TotalTax )
  
  const houseRateImpact = ( resultsHouse.EffectiveTaxRateOnGross - resultsCurrent.EffectiveTaxRateOnGross )
  const senateRateImpact = ( resultsSenate.EffectiveTaxRateOnGross - resultsCurrent.EffectiveTaxRateOnGross )

  return(
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Current</Table.HeaderCell>
          <Table.HeaderCell>House</Table.HeaderCell>
          <Table.HeaderCell>Senate</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            Total Tax
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsCurrent.TotalTax} prefix='$' decimalScale={0}/>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsHouse.TotalTax} prefix='$' decimalScale={0}/>
            &nbsp;
            <FormatImpact value={houseTaxImpact} absOrPct={true}/>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsSenate.TotalTax} prefix='$' decimalScale={0}/>
            &nbsp;
            <FormatImpact value={senateTaxImpact} absOrPct={true}/>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            Effective Rate
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsCurrent.EffectiveTaxRateOnGross * 100} suffix='%' fixedDecimalScale={true} decimalScale={1}/>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsHouse.EffectiveTaxRateOnGross * 100} suffix='%' fixedDecimalScale={true} decimalScale={1}/>
            &nbsp;
            <FormatImpact value={houseRateImpact} absOrPct={false}/>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsSenate.EffectiveTaxRateOnGross * 100} suffix='%' fixedDecimalScale={true} decimalScale={1}/>
            &nbsp;
            <FormatImpact value={senateRateImpact} absOrPct={false}/>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return({
    input: state.input
  })
}

export default connect(mapStateToProps)(Result)