import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container, Header, Segment, Grid } from 'semantic-ui-react'

import Result from './Result'
import Inputs from './Inputs'

// import 'semantic-ui-css/semantic.min.css'

class Index extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <Container>
        <Header textAlign='center' as='h1'>Senate & House Tax Plan Impact Calculator</Header>
        <Grid>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <Header>Your info</Header>
              <Inputs/>
            </Grid.Column>
            <Grid.Column>
              <Header>Results</Header>
              <Result/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return({
  })
}

// export default Index;
export default connect(mapStateToProps)(Index)


