import React, { Component } from 'react'
import { connect } from 'react-redux'

import NVD3Chart from 'react-nvd3'

import { calculateFromInputs } from '../utils/calculator'

const fancyRound = (x,roundUp=false) => {
  // for nearest power of 10 below X, choose closest of 1x, 2.5x, 5x or 10x
  
  const multFactor = 2.5/2.0 // i.e. map [ 1, 2, 4, 8 ] to [ 1, 2.5, 5, 10 ]

  const nearestPowerOf10 = 10 ** Math.floor(Math.log10(x))
  const scaledPowerOf2 = Math.log(x/nearestPowerOf10/multFactor) / Math.log(2)
  
  if(roundUp) {
    return nearestPowerOf10 * ( 2 ** Math.ceil( scaledPowerOf2 ) ) * multFactor    
  }
  else {
    return nearestPowerOf10 * ( 2 ** Math.round( scaledPowerOf2 ) ) * multFactor    
  }
}

const getData = ({input,field}) => {
  const xStep = fancyRound(input.grossIncome * 0.05)
  const numSteps = Math.ceil(input.grossIncome * 2 / xStep)
  
  const currentValue = calculateFromInputs(input,'Current')[field]
  
  let retval = [
    { key: 'Current', values: [] },
    { key: 'Senate', values: [] },
    { key: 'House', values: [] },
  ]
  
  let dataCurrent = []
  let dataHouse = []
  let dataSenate = []
  let maxY = null
  
  for( var n = 0; n <= numSteps; n++ ) {
    const thisGrossIncome = n * xStep
    let thisInput = Object.assign({},input,{grossIncome: thisGrossIncome})
    const resultCurrent = calculateFromInputs(thisInput,'Current')
    const resultHouse = calculateFromInputs(thisInput,'House')
    const resultSenate = calculateFromInputs(thisInput,'Senate')

    retval[0].values.push([thisGrossIncome, resultCurrent[field]])
    retval[1].values.push([thisGrossIncome, resultHouse[field]])
    retval[2].values.push([thisGrossIncome, resultSenate[field]])
    
    for(const y of [resultCurrent[field],resultHouse[field],resultSenate[field]]) {
      if(isNaN(y)) { continue }
      maxY = Math.max(maxY,y)
    }
  }
  
  return({
    datum: retval,
    xStep: xStep,
    currentLevel: currentValue,
    maxX: xStep * numSteps,
    maxY: fancyRound(maxY,true)
  })
}

class ChartIncomeSensitivity extends Component {
  _addLine() {
    if(this.line) {
      this.line.node().remove()
    }
    
    var maxX = this.xDomain[1]
    var maxY = this.yDomain[1]

    var container = d3.select('.nv-background')
    
    var bBox = container.node().getBBox()

    var x = d3.scale.linear().range([0, bBox.width])
    var y = d3.scale.linear().range([bBox.height, 0])

    this.line = container
      .append("line")
      .attr("class", "x")
      .style("stroke", "blue")
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.5)
      .attr({
        x1: x(this.props.input.grossIncome/maxX), x2: x(this.props.input.grossIncome/maxX),
        y1: y(0), y2: y(1.0)
      })
      // .attr({
      //   x1: x(0), x2: x(1.0),
      //   y1: y(this.data.currentLevel/maxY), y2: y(this.data.currentLevel/maxY)
      // })      
  }
  
  componentDidUpdate() {
    console.log('calling component did mount')
    console.log('this.refs = ', this.refs)
    
    setTimeout(this._addLine.bind(this),250)      
  }
  
  componentDidMount() {
    setTimeout(this._addLine.bind(this),250)
  }
  
  render() {
    const {input,ui} = this.props
    this.showEffectiveRate = ui.chartEffectiveRate
    this.data = getData({
      input,
      field: this.showEffectiveRate ? 'EffectiveTaxRateOnGross' : 'TotalTax'
    })
    console.log(this.data)
    
    const yAxis = this.showEffectiveRate ?
      {
        tickFormat: (d) => { return d3.format(",")(Math.round(d*100)) + '%' },
        axisLabel: 'Rate'      
      } 
    :
      {
        tickFormat: (d) => { return '$' + d3.format(",")(Math.round(d)) },
        axisLabel: 'Tax'
      }
    
    this.xDomain = [0,this.data.maxX]
    this.yDomain = [0,this.data.maxY]
    
    return(
      <div>
        <NVD3Chart
          height={300}
          type='lineChart'
          datum={this.data.datum}
          x={(d) => d[0]}
          y={(d) => d[1]}
          xAxis={{
            tickFormat: (d) => { return '$' + d3.format(",")(Math.round(d)) },
            axisLabel: 'Gross Income',
          }}
          xDomain={this.xDomain}
          yAxis={yAxis}
          yDomain={this.yDomain}
          ref='nvd3-chart'
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    input: state.input,
    ui: state.ui,
  })
}

export default connect(mapStateToProps)(ChartIncomeSensitivity)