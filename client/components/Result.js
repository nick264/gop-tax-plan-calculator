import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

// import formatNumber from 'format-number'
import NumberFormat from 'react-number-format'

import { calculateFromInputs } from '../utils/calculator'

import { Table, Button, Icon } from 'semantic-ui-react'

import { showDetails } from '../actions/ui'

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
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsCurrent.TotalTax} prefix='$' decimalScale={0}/>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsHouse.TotalTax} prefix='$' decimalScale={0}/>
            &nbsp;
            <FormatImpact value={houseTaxImpact} pctOrAbs={false}/>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsSenate.TotalTax} prefix='$' decimalScale={0}/>
            &nbsp;
            <FormatImpact value={senateTaxImpact} pctOrAbs={false}/>
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
            <FormatImpact value={houseRateImpact} pctOrAbs={true}/>
          </Table.Cell>
          <Table.Cell>
            <NumberFormat thousandSeparator={true} displayType='text' value={resultsSenate.EffectiveTaxRateOnGross * 100} suffix='%' fixedDecimalScale={true} decimalScale={1}/>
            &nbsp;
            <FormatImpact value={senateRateImpact} pctOrAbs={true}/>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      {
        ui.detailsVisible && [
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Body>,
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Gross Income</Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsCurrent.GrossIncome}/></Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsHouse.GrossIncome}/></Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsSenate.GrossIncome}/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>,
          <Table.Body>
            <Table.Row>
              <Table.Cell>Standard Deduction</Table.Cell>
              <Table.Cell><FormatAmount value={resultsCurrent.StandardDeduction}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsHouse.StandardDeduction}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsSenate.StandardDeduction}/></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Mortgage Interest Deduction</Table.Cell>
              <Table.Cell><FormatAmount value={resultsCurrent.MortgageInterest}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsHouse.MortgageInterest}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsSenate.MortgageInterest}/></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>State and Local Property Tax Deduction</Table.Cell>
              <Table.Cell><FormatAmount value={resultsCurrent.SALTProperty}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsHouse.SALTProperty}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsSenate.SALTProperty}/></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>State and Local Income Tax Deduction</Table.Cell>
              <Table.Cell><FormatAmount value={resultsCurrent.SALTIncome}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsHouse.SALTIncome}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsSenate.SALTIncome}/></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Personal Exemption Amount</Table.Cell>
              <Table.Cell><FormatAmount value={resultsCurrent.PersonalExemptionAmount}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsHouse.PersonalExemptionAmount}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsSenate.PersonalExemptionAmount}/></Table.Cell>
            </Table.Row>
          </Table.Body>,
          <Table.Header>          
            <Table.Row>
              <Table.HeaderCell>Taxable Income</Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsCurrent.TaxableIncome}/></Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsHouse.TaxableIncome}/></Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsSenate.TaxableIncome}/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>,
          <Table.Body>
            <Table.Row>
              <Table.Cell>Avg Tax Bracket</Table.Cell>
              <Table.Cell><FormatAmount value={resultsCurrent.EffectiveTaxRate} pctOrAbs={true}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsHouse.EffectiveTaxRate} pctOrAbs={true}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsSenate.EffectiveTaxRate} pctOrAbs={true}/></Table.Cell>
            </Table.Row>
          </Table.Body>,
          <Table.Header>          
            <Table.Row>
              <Table.HeaderCell>Total Tax Before Credits</Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsCurrent.TotalTaxPreCredits}/></Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsHouse.TotalTaxPreCredits}/></Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsSenate.TotalTaxPreCredits}/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>,
          <Table.Body>
            <Table.Row>
              <Table.Cell>Child Tax Credit</Table.Cell>
              <Table.Cell><FormatAmount value={resultsCurrent.ChildTaxCredit}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsHouse.ChildTaxCredit}/></Table.Cell>
              <Table.Cell><FormatAmount value={resultsSenate.ChildTaxCredit}/></Table.Cell>
            </Table.Row>
          </Table.Body>,
          <Table.Header>                    
            <Table.Row>
              <Table.HeaderCell>Total Tax</Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsCurrent.TotalTaxExAMT}/></Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsHouse.TotalTaxExAMT}/></Table.HeaderCell>
              <Table.HeaderCell><FormatAmount value={resultsSenate.TotalTaxExAMT}/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        ]
      }
      {
        ui.detailsVisible && ( resultsCurrent.AMTActive || resultsHouse.AMTActive || resultsSenate.AMTActive ) &&
          [
            <Table.Body>
              <Table.Row>
                <Table.Cell>AMT Triggered</Table.Cell>
                <Table.Cell>{resultsCurrent.AMTActive ? 'YES' : ''}</Table.Cell>
                <Table.Cell>{resultsHouse.AMTActive ? 'YES' : ''}</Table.Cell>
                <Table.Cell>{resultsSenate.AMTActive ? 'YES' : ''}</Table.Cell>
              </Table.Row>
            </Table.Body>,
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Total Tax (after AMT)</Table.HeaderCell>
                <Table.HeaderCell><FormatAmount value={resultsCurrent.TotalTax}/></Table.HeaderCell>
                <Table.HeaderCell><FormatAmount value={resultsHouse.TotalTax}/></Table.HeaderCell>
                <Table.HeaderCell><FormatAmount value={resultsSenate.TotalTax}/></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          ]
      }
      {
        !ui.detailsVisible &&
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