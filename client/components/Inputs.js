import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateInputField } from '../actions/input'
import { Form, Container, Header, Segment, Button, Input, Label, Table } from 'semantic-ui-react'

import Tooltip from './Tooltip'

import NumberFormat from 'react-number-format'

class Inputs extends Component {
  _handleInputChange(field) {
    return((e) => this.props.dispatch(updateInputField(field,e.target.value)))
  }
  
  _updateField(field,value) {
   this.props.dispatch(updateInputField(field,value)) 
  }
  
  render() {
    const { input, dispatch } = this.props
    
    return(
      <Table color='blue'>
        <Table.Row>
          <Table.Cell width={9}>
            <label htmlFor='grossIncome'>Gross Income</label>
            <Tooltip type='input' field='GrossIncome' style={{float: 'right'}}/>
          </Table.Cell>
          <Table.Cell>
            <Input 
              type='text'
              id='grossIncome'
              labelPosition='left'
              fluid
            >
              <Label
                basic
                content='$'
              />
              <NumberFormat value={input.grossIncome || ''} thousandSeparator={true} onValueChange={({value}) => this._updateField('grossIncome',value)}/>
            </Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <label htmlFor='filingStatus'>Filing Status</label>
            <Tooltip type='input' field='FilingStatus' style={{float: 'right'}}/>
          </Table.Cell>
          <Table.Cell>
            <Button.Group fluid>
              <Button active={input.filingStatus == 'single'} onClick={(e) => dispatch(updateInputField('filingStatus','single'))}>Single</Button>
              <Button.Or />
              <Button active={input.filingStatus == 'married'} onClick={(e) => dispatch(updateInputField('filingStatus','married'))}>Married</Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>   
        <Table.Row>
          <Table.Cell>
            <label htmlFor='dependentChildrenCount'>Children</label>
            <Tooltip type='input' field='DependentChildren' style={{float: 'right'}}/>
          </Table.Cell>
          <Table.Cell><Input fluid type='text' id='dependentChildrenCount' value={input.dependentChildrenCount} onChange={this._handleInputChange('dependentChildrenCount')}/></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <label htmlFor='personalExemptions'>Personal Exemptions</label>
            <Tooltip type='input' field='PersonalExemptions' style={{float: 'right'}}/>            
          </Table.Cell>
          <Table.Cell><Input fluid type='text' id='personalExemptions' value={input.personalExemptions} onChange={this._handleInputChange('personalExemptions')}/></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <label htmlFor='itemize'>Itemize?</label>
            <Tooltip type='input' field='Itemize' style={{float: 'right'}}/>            
          </Table.Cell>
          <Table.Cell>
            <Button.Group fluid>
              <Button active={input.itemize == false} onClick={(e) => dispatch(updateInputField('itemize',false))}>Standard</Button>
              <Button.Or />
              <Button active={input.itemize == true} onClick={(e) => dispatch(updateInputField('itemize',true))}>Itemized</Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>                  
        {
          input.itemize && [
            <Table.Row>
              <Table.Cell>
                <label htmlFor='mortgageInterest'>Mortgage Interest</label>
                <Tooltip type='input' field='MortgageInterest' style={{float: 'right'}}/>
              </Table.Cell>
              <Table.Cell>
                <Input 
                  type='text'
                  id='mortgageInterest'
                  labelPosition='left'
                  fluid
                >
                  <Label
                    basic
                    content='$'
                  />
                  <NumberFormat value={input.mortgageInterest} thousandSeparator={true} onValueChange={({value}) => this._updateField('mortgageInterest',value)}/>
                </Input>
              </Table.Cell>
            </Table.Row>,
            <Table.Row>
              <Table.Cell>
                <label htmlFor='charitableDonations'>Charitable Donations</label>
                <Tooltip type='input' field='Charity' style={{float: 'right'}}/>
              </Table.Cell>
              <Table.Cell>
                <Input 
                  type='text'
                  id='charitableDonations'
                  labelPosition='left'
                  fluid
                >
                  <Label
                    basic
                    content='$'
                  />
                  <NumberFormat value={input.charitableDonations} thousandSeparator={true} onValueChange={({value}) => this._updateField('charitableDonations',value)}/>
                </Input>
              </Table.Cell>
            </Table.Row>,
            <Table.Row>
              <Table.Cell>
                <label htmlFor='stateLocalPropertyTaxes'>State/Local Property Taxes</label>
                <Tooltip type='input' field='SALTProperty' style={{float: 'right'}}/>
              </Table.Cell>
              <Table.Cell>
                <Input 
                  type='text'
                  id='stateLocalPropertyTaxes'
                  labelPosition='left'
                  fluid
                >
                  <Label
                    basic
                    content='$'
                  />
                  <NumberFormat value={input.stateLocalPropertyTaxes} thousandSeparator={true} onValueChange={({value}) => this._updateField('stateLocalPropertyTaxes',value)}/>
                </Input>
              </Table.Cell>
            </Table.Row>,
            <Table.Row>
              <Table.Cell>
                <label htmlFor='stateLocalIncomeTaxes'>State/Local Income Taxes</label>
                <Tooltip type='input' field='SALTIncome' style={{float: 'right'}}/>
              </Table.Cell>
              <Table.Cell>
                <Input 
                  type='text'
                  id='stateLocalIncomeTaxes'
                  labelPosition='left'
                  fluid
                >
                  <Label
                    basic
                    content='$'
                  />
                  <NumberFormat value={input.stateLocalIncomeTaxes} thousandSeparator={true} onValueChange={({value}) => this._updateField('stateLocalIncomeTaxes',value)}/>
                </Input>
              </Table.Cell>
            </Table.Row>
          ]
        }
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    input: state.input,
  })
}

// export default Index;
export default connect(mapStateToProps)(Inputs)
