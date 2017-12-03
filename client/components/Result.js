import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

// import formatNumber from 'format-number'
import NumberFormat from 'react-number-format'

import { calculateFromInputs } from '../utils/calculator'

import { Table } from 'semantic-ui-react'

const Result = ({input}) => {
  const resultsCurrent = calculateFromInputs(input,'Current')
  const resultsHouse = calculateFromInputs(input,'House')
  const resultsSenate = calculateFromInputs(input,'Senate')

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
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsSenate.TotalTax} prefix='$' decimalScale={0}/>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            Effective Rate
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsCurrent.EffectiveTaxRateOnGross * 100} suffix='%' decimalScale={1}/>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsHouse.EffectiveTaxRateOnGross * 100} suffix='%' decimalScale={1}/>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsSenate.EffectiveTaxRateOnGross * 100} suffix='%' decimalScale={1}/>
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