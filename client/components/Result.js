import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import FormatAmount from './FormatAmount'
import Details from './Details'
import Tooltip from './Tooltip'

import { Table, Button, Icon, Header } from 'semantic-ui-react'

import { calculateFromInputs } from '../utils/calculator'
import { showDetails } from '../actions/ui'


const COLOR_GOOD = '#1ebc30'
const COLOR_BAD = '#db2828'
const COLOR_NEUTRAL = '#aaa'

const FormatImpact = ({value, pctOrAbs}) => {  
  let color = null
  let prefix = ''
  
  if(value < 0) {
    color = COLOR_GOOD
  }
  else if(value > 0) {
    color = COLOR_BAD
    prefix = '+'
  }
  else {
    color = COLOR_NEUTRAL
  }
  
  return(
    <strong style={{color: color}}>
      (<FormatAmount value={value} pctOrAbs={pctOrAbs} prefix={prefix}/>)
    </strong>
  )  
}

const ImpactSummary = ({house,senate}) => {
  const houseDir = Math.sign(house)
  const senateDir = Math.sign(senate)
  
  const dirToWords = {
    '-1': <span><span style={{color: COLOR_GOOD}}>save</span> money under</span>,
    '0': <span>be <span style={{color: COLOR_NEUTRAL}}>unaffected</span> by</span>,
    '1': <span><span style={{color: COLOR_BAD}}>lose</span> money under</span>
  }
  
  if(houseDir == senateDir) {
    return(
      <span>You would {dirToWords[houseDir]} both plans</span>
    )
  }
  else {
    return(
      <span>You would {dirToWords[houseDir]} under the House plan and {dirToWords[senateDir]} under the Senate plan.</span>
    )
  }
  
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
          <Table.HeaderCell colSpan='4'>
            <Header textAlign='center'>
              <ImpactSummary house={houseTaxImpact} senate={senateTaxImpact}/>
            </Header>
          </Table.HeaderCell>
        </Table.Row>
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
            <Tooltip type='output' field='TotalTax'/>
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
            <Tooltip type='output' field='EffectiveTaxRateOnGross'/>
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