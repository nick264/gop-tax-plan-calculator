import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateInputField, updateInputFieldAndRecalculate } from '../actions/input'
import { calculateResults } from '../actions/calculate' 
import { Button, Input } from 'semantic-ui-react'

import Result from './Result'

// import 'semantic-ui-css/semantic.min.css'

class Index extends Component {
  constructor(props) {
    super(props)
  }
  
  _handleInputChange(field) {
    return((e) => this.props.dispatch(updateInputFieldAndRecalculate(field,e.target.value)))
  }
  
  render() {
    const { input, calculate, dispatch } = this.props
    
    return(
      <div>
        <h1>GOP Tax Plan Impact Calculator</h1>
        <table>
          <tr>
            <td><label htmlFor='grossIncome'>Gross Income</label></td>
            <td><Input type='text' id='grossIncome' value={input.grossIncome} onChange={this._handleInputChange('grossIncome')}/></td>
          </tr>
          <tr>
            <td><label htmlFor='filingStatus'>Filing Status</label></td>
            <td>
              <Button.Group>
                <Button active={input.filingStatus == 'single'} onClick={(e) => dispatch(updateInputFieldAndRecalculate('filingStatus','single'))}>Single</Button>
                <Button.Or />
                <Button active={input.filingStatus == 'married'} onClick={(e) => dispatch(updateInputFieldAndRecalculate('filingStatus','married'))}>Married</Button>
              </Button.Group>
            </td>
          </tr>        
          <tr>
            <td><label htmlFor='itemize'>Itemize?</label></td>
            <td>
              <Button.Group>
                <Button active={input.itemize == false} onClick={(e) => dispatch(updateInputFieldAndRecalculate('itemize',false))}>Standard</Button>
                <Button.Or />
                <Button active={input.itemize == true} onClick={(e) => dispatch(updateInputFieldAndRecalculate('itemize',true))}>Itemized</Button>
              </Button.Group>
            </td>
          </tr>        
          <tr>
            <td><label htmlFor='dependentChildrenCount'>Children</label></td>
            <td><Input type='text' id='dependentChildrenCount' value={input.dependentChildrenCount} onChange={this._handleInputChange('dependentChildrenCount')}/></td>
          </tr>
          <tr>
            <td><label htmlFor='mortgageInterest'>Mortgage Interest</label></td>
            <td><Input type='text' id='mortgageInterest' value={input.mortgageInterest} onChange={this._handleInputChange('mortgageInterest')}/></td>
          </tr>
          <tr>
            <td><label htmlFor='charitableDonations'>Charitable Donations</label></td>
            <td><Input type='text' id='charitableDonations' value={input.charitableDonations} onChange={this._handleInputChange('charitableDonations')}/></td>
          </tr>
          <tr>
            <td><label htmlFor='stateLocalPropertyTaxes'>State/Local Property Taxes</label></td>
            <td><Input type='text' id='stateLocalPropertyTaxes' value={input.stateLocalPropertyTaxes} onChange={this._handleInputChange('stateLocalPropertyTaxes')}/></td>
          </tr>
          <tr>
            <td><label htmlFor='stateLocalIncomeTaxes'>State/Local Income Taxes</label></td>
            <td><Input type='text' id='stateLocalIncomeTaxes' value={input.stateLocalIncomeTaxes} onChange={this._handleInputChange('stateLocalIncomeTaxes')}/></td>
          </tr>
          <tr>
            <td><label htmlFor='personalExemptions'>Personal Exemptions</label></td>
            <td><Input type='text' id='personalExemptions' value={input.personalExemptions} onChange={this._handleInputChange('personalExemptions')}/></td>
          </tr>

        </table>
        <Button onClick={(e) => dispatch(calculateResults())}>
          Calculate
        </Button>
        
        {
          calculate.valid &&
            <Result/>
        }        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    input: state.input,
    calculate: state.calculate
  })
}

// export default Index;
export default connect(mapStateToProps)(Index)


