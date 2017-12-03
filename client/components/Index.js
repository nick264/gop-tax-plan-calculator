import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateInputField } from '../actions/input'
import { Button, Input, Label } from 'semantic-ui-react'

import Result from './Result'

import NumberFormat from 'react-number-format'

// import 'semantic-ui-css/semantic.min.css'

class Index extends Component {
  constructor(props) {
    super(props)
  }
  
  _handleInputChange(field) {
    return((e) => this.props.dispatch(updateInputField(field,e.target.value)))
  }
  
  _updateField(field,value) {
   this.props.dispatch(updateInputField(field,value)) 
  }
  
  render() {
    const { input, calculate, dispatch } = this.props
    
    return(
      <div>
        <h1>GOP Tax Plan Impact Calculator</h1>
        <table>
          <tr>
            <td><label htmlFor='grossIncome'>Gross Income</label></td>
            <td>
              <Input 
                type='text'
                id='grossIncome'
                labelPosition='left'
              >
                <Label
                  basic
                  content='$'
                />
                <NumberFormat value={input.grossIncome} thousandSeparator={true} onValueChange={({value}) => this._updateField('grossIncome',value)}/>
              </Input>
            </td>
          </tr>
          <tr>
            <td><label htmlFor='filingStatus'>Filing Status</label></td>
            <td>
              <Button.Group>
                <Button active={input.filingStatus == 'single'} onClick={(e) => dispatch(updateInputField('filingStatus','single'))}>Single</Button>
                <Button.Or />
                <Button active={input.filingStatus == 'married'} onClick={(e) => dispatch(updateInputField('filingStatus','married'))}>Married</Button>
              </Button.Group>
            </td>
          </tr>        
          <tr>
            <td><label htmlFor='itemize'>Itemize?</label></td>
            <td>
              <Button.Group>
                <Button active={input.itemize == false} onClick={(e) => dispatch(updateInputField('itemize',false))}>Standard</Button>
                <Button.Or />
                <Button active={input.itemize == true} onClick={(e) => dispatch(updateInputField('itemize',true))}>Itemized</Button>
              </Button.Group>
            </td>
          </tr>        
          <tr>
            <td><label htmlFor='dependentChildrenCount'>Children</label></td>
            <td><Input type='text' id='dependentChildrenCount' value={input.dependentChildrenCount} onChange={this._handleInputChange('dependentChildrenCount')}/></td>
          </tr>
          <tr>
            <td><label htmlFor='mortgageInterest'>Mortgage Interest</label></td>
            <td>
              <Input 
                type='text'
                id='mortgageInterest'
                labelPosition='left'
              >
                <Label
                  basic
                  content='$'
                />
                <NumberFormat value={input.mortgageInterest} thousandSeparator={true} onValueChange={({value}) => this._updateField('mortgageInterest',value)}/>
              </Input>
            </td>
          </tr>
          <tr>
            <td><label htmlFor='charitableDonations'>Charitable Donations</label></td>
            <td>
              <Input 
                type='text'
                id='charitableDonations'
                labelPosition='left'
              >
                <Label
                  basic
                  content='$'
                />
                <NumberFormat value={input.charitableDonations} thousandSeparator={true} onValueChange={({value}) => this._updateField('charitableDonations',value)}/>
              </Input>
            </td>
          </tr>
          <tr>
            <td><label htmlFor='stateLocalPropertyTaxes'>State/Local Property Taxes</label></td>
            <td>
              <Input 
                type='text'
                id='stateLocalPropertyTaxes'
                labelPosition='left'
              >
                <Label
                  basic
                  content='$'
                />
                <NumberFormat value={input.stateLocalPropertyTaxes} thousandSeparator={true} onValueChange={({value}) => this._updateField('stateLocalPropertyTaxes',value)}/>
              </Input>
            </td>
          </tr>
          <tr>
            <td><label htmlFor='stateLocalIncomeTaxes'>State/Local Income Taxes</label></td>
            <td>
              <Input 
                type='text'
                id='stateLocalIncomeTaxes'
                labelPosition='left'
              >
                <Label
                  basic
                  content='$'
                />
                <NumberFormat value={input.stateLocalIncomeTaxes} thousandSeparator={true} onValueChange={({value}) => this._updateField('stateLocalIncomeTaxes',value)}/>
              </Input>
            </td>
          </tr>
          <tr>
            <td><label htmlFor='personalExemptions'>Personal Exemptions</label></td>
            <td><Input type='text' id='personalExemptions' value={input.personalExemptions} onChange={this._handleInputChange('personalExemptions')}/></td>
          </tr>

        </table>
        <Result/>
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


