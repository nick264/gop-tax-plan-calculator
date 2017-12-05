import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container, Header, Segment, Grid, Icon, Divider, Menu, Image, Button, Dropdown } from 'semantic-ui-react'

// import IconCalculator from 'react-icons/lib/fa/calculator'
// import IconList from 'react-icons/lib/fa/list'

import { revealResults, toggleChartEffectiveRate } from '../actions/ui'
import { calculateFromInputs } from '../utils/calculator'

import Result from './Result'
import Inputs from './Inputs'
import ChartIncomeSensitivity from './ChartIncomeSensitivity'

// import 'semantic-ui-css/semantic.min.css'

class Index extends Component {
  constructor(props) {
    super(props)
  }
  
  
  _inputsComplete() {
    // kind of hacky - just calculate results to see if they compute
    const { input } = this.props
    return input.itemize != null && input.filingStatus && !isNaN(calculateFromInputs(input,'Current').TotalTax)
  }
  
  render() {
    const { ui, dispatch } = this.props
    return(
      <div>
        <Menu inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image
                size='mini'
                src='https://react.semantic-ui.com/logo.png'
                style={{ marginRight: '1.5em' }}
              />
              Home
            </Menu.Item>
            <Menu.Item as='a' position='right'>About</Menu.Item>
          </Container>
        </Menu>

        <Container textAlign='center'>
          <Header
            as='h1'
            style={{ fontSize: '2.5em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
          >
            Senate & House Tax Plan Impact Calculator
          </Header>
        </Container>
        <Divider section/>
        <Container>
          <Grid>
            <Grid.Row centered columns={2}>
              <Grid.Column>
                <Header floated='left'>
                  <Icon name='list'/>
                  <Header.Content>
                    Your info
                  </Header.Content>
                </Header>
                {
                  !ui.resultsVisible &&
                    <Button
                      primary
                      content='Results'
                      floated='right'
                      icon='right arrow'
                      labelPosition='right'
                      disabled={!this._inputsComplete()}
                      onClick={() => dispatch(revealResults())}
                    />
                }
                <Inputs/>
              </Grid.Column>
              {
                ui.resultsVisible &&
                  <Grid.Column>
                    <Header>
                      <Icon name='calculator'/>
                      <Header.Content>
                        Results
                      </Header.Content>
                    </Header>
                    <Result/>
                    <Segment.Group>
                      <Segment clearing style={{padding: '5px 10px'}}>
                        <Header as='h4' floated='left' style={{margin: '8px 0' }}>
                          If your income changed...
                        </Header>
                        <Header floated='right' style={{margin: '0'}}>
                          <Dropdown button basic floating options={[{text: '$', value: false},{text: '%', value: true}]} value={ui.chartEffectiveRate || false} onChange={(e,option) => { console.log(option); dispatch(toggleChartEffectiveRate(option.value))}}/>
                        </Header>
                      </Segment>
                      <Segment attached>
                        <ChartIncomeSensitivity/>
                      </Segment>
                    </Segment.Group>
                  </Grid.Column>
              }
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    ui: state.ui,
    input: state.input
  })
}

// export default Index;
export default connect(mapStateToProps)(Index)