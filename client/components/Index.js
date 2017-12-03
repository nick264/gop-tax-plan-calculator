// import React, { Component, PropTypes} from 'react';
// import ReactDOM from 'react-dom';

// const Index = () => {
//   return(
//     <div>
//       <h1>Hello world, in the src folder</h1>
//     </div>
//   )
// }

// export default Index;


import React, { Component } from 'react'
import { connect } from 'react-redux'

class Index extends Component {
  constructor(props) {
    super(props)
  }
  
  _handleInputChange(a,b,c) {
    console.log(a,b,c)
  }
  
  render() {
    const { input } = this.props
    
    return(
      <div>
        <h1>Hello world, in the src folder with my cool connected component</h1>
        <label htmlFor='gross_income'>Gross Income</label>
        <input type='text' id='gross_income' value={input.grossIncome} onChange={(e) => this._handleInputChange(e,'grossIncome')}/>
        <div>
          Gross income: { input.grossIncome }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({input}) => {
  return({
    input: input
  })
}

// export default Index;
export default connect(mapStateToProps)(Index)


