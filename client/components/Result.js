import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import formatNumber from 'format-number'

import { calculateFromInputs } from '../utils/calculator'

const Result = ({input}) => {
  const resultsCurrent = calculateFromInputs(input,'Current')
  const resultsHouse = calculateFromInputs(input,'House')
  const resultsSenate = calculateFromInputs(input,'Senate')

  return(
    <table>
      <tr>
        <td>Current</td>
        <td>House</td>
        <td>Senate</td>
      </tr>
      <tr>
        <td>{resultsCurrent.TotalTax}</td>
        <td>{resultsHouse.TotalTax}</td>
        <td>{resultsSenate.TotalTax}</td>
      </tr>
    </table>
  )
}

const mapStateToProps = (state) => {
  return({
    input: state.input
  })
}

export default connect(mapStateToProps)(Result)