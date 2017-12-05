import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import FormatAmount from './FormatAmount'
import Details from './Details'
import { Table, Button, Icon } from 'semantic-ui-react'

import { calculateFromInputs } from '../utils/calculator'

import { showDetails } from '../actions/ui'

const FormatImpact = ({value, pctOrAbs}) => {  
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
      (<FormatAmount value={value} pctOrAbs={pctOrAbs} prefix={prefix}/>)
    </strong>
  )  
}

const Result = ({input, ui, dispatch}) => {
  const resultsCurrent = calculateFromInputs(input,'Current')
  const resultsHouse = calculateFromInputs(input,'House')
  const resultsSenate = calculateFromInputs(input,'Senate')
  
  const houseTaxImpact = ( resultsHouse.TotalTax - resultsCurrent.TotalTax )
  const senateTaxImpact = ( resultsSenate.TotalTax - resultsCurrent.TotalTax )
  
  const houseRateImpact = ( resultsHouse.EffectiveTaxRateOnGross - resultsCurrent.EffectiveTaxRateOnGross )
  const senateRateImpact = ( resultsSenate.EffectiveTaxRateOnGross - resultsCurrent.EffectiveTaxRateOnGross )

  return(
    <Table color='green'>
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
            <FormatAmount value={resultsCurrent.TotalTax}/>
          </Table.Cell>
          <Table.Cell>
            <FormatAmount value={resultsHouse.TotalTax}/>
            &nbsp;
            <FormatImpact value={houseTaxImpact} pctOrAbs={false}/>
          </Table.Cell>
          <Table.Cell>
            <FormatAmount value={resultsSenate.TotalTax}/>
            &nbsp;
            <FormatImpact value={senateTaxImpact} pctOrAbs={false}/>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            Effective Rate
          </Table.Cell>
          <Table.Cell>
            <FormatAmount value={resultsCurrent.EffectiveTaxRateOnGross} pctOrAbs/>
          </Table.Cell>
          <Table.Cell>
            <FormatAmount value={resultsHouse.EffectiveTaxRateOnGross} pctOrAbs/>
            &nbsp;
            <FormatImpact value={houseRateImpact} pctOrAbs={true}/>
          </Table.Cell>
          <Table.Cell>
            <FormatAmount value={resultsSenate.EffectiveTaxRateOnGross} pctOrAbs/>
            &nbsp;
            <FormatImpact value={senateRateImpact} pctOrAbs={true}/>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      {
        ui.detailsVisible ?
          <Details
            resultsCurrent={resultsCurrent}
            resultsHouse={resultsHouse}
            resultsSenate={resultsSenate}
          />
        :
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                <Button floated='right' icon labelPosition='left' size='tiny' onClick={() => dispatch(showDetails())}>
                  <Icon name='plus' /> Details
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
      }
    </Table>
  )
}

const mapStateToProps = (state) => {
  return({
    input: state.input,
    ui: state.ui
  })
}

export default connect(mapStateToProps)(Result)