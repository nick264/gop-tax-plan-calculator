import React, { Component } from 'react'
import FormatAmount from './FormatAmount'
import { Table, Button } from 'semantic-ui-react'

import Tooltip from './Tooltip'

const DetailsRow = ({name, field, header, data, pctOrAbs}) => {
  const TableCellTag = header ? Table.HeaderCell : Table.Cell
  
  console.log(data)
  
  return(
    <Table.Row>
      <TableCellTag>
        {name}
        <Tooltip type='output' field={field}/>
      </TableCellTag>
      <TableCellTag><FormatAmount value={data.resultsCurrent[field]} pctOrAbs={pctOrAbs}/></TableCellTag>
      <TableCellTag><FormatAmount value={data.resultsHouse[field]} pctOrAbs={pctOrAbs}/></TableCellTag>
      <TableCellTag><FormatAmount value={data.resultsSenate[field]} pctOrAbs={pctOrAbs}/></TableCellTag>
    </Table.Row>
  )  
}

class Details extends Component {
  render() {
    const { resultsCurrent, resultsHouse, resultsSenate } = this.props
    const data = { resultsCurrent, resultsHouse, resultsSenate }
    
    const taxableIncome = [
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell colSpan='4'>&nbsp;</Table.HeaderCell>
        </Table.Row>
      </Table.Body>,
      <Table.Header>
        <DetailsRow name='Gross Income' field='GrossIncome' data={data} header/> 
      </Table.Header>,
      <Table.Body>
        <DetailsRow name='Standard Deduction' field='StandardDeduction' data={data}/> 
        <DetailsRow name='Mortgage Interest Deduction' field='MortgageInterest' data={data}/> 
        <DetailsRow name='State and Local Property Tax Deduction' field='SALTProperty' data={data}/> 
        <DetailsRow name='State and Local Income Tax Deduction' field='SALTIncome' data={data}/> 
        <DetailsRow name='Personal Exemption Amount' field='PersonalExemptionAmount' data={data}/> 
      </Table.Body>,
      <Table.Header>          
        <DetailsRow name='Taxable Income' field='TaxableIncome' data={data} header/> 
      </Table.Header>,
      <Table.Body>
        <DetailsRow name='Avg Tax Bracket' field='EffectiveTaxRate' data={data} pctOrAbs={true}/> 
      </Table.Body>
    ]
    
    const amt = ( resultsCurrent.AMTActive || resultsHouse.AMTActive || resultsSenate.AMTActive ) ?
      [
        <Table.Header>                    
          <DetailsRow name='Total Tax Before AMT/Credits' field='TotalTaxExAMT' data={data} header/> 
        </Table.Header>,
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              AMT Triggered
              <Tooltip type='output' field='AMTActive'/>
            </Table.Cell>
            <Table.Cell>{resultsCurrent.AMTActive ? 'YES' : ''}</Table.Cell>
            <Table.Cell>{resultsHouse.AMTActive ? 'YES' : ''}</Table.Cell>
            <Table.Cell>{resultsSenate.AMTActive ? 'YES' : ''}</Table.Cell>
          </Table.Row>
        </Table.Body>
      ]
    :
      []

    const creditsAndTotal = [
      <Table.Header>          
        <DetailsRow name='Total Tax Before Credits' field='TotalTaxPreCredits' data={data} header/> 
      </Table.Header>,
      <Table.Body>
        <DetailsRow name='Child Tax Credit' field='ChildTaxCredit' data={data}/> 
      </Table.Body>,
      <Table.Header>
        <DetailsRow name='Total Tax' field='TotalTax' data={data} header/> 
      </Table.Header>
    ]
    
    return(_.concat(taxableIncome,amt,creditsAndTotal))
  }
}

export default Details