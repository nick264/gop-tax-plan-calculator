import React, { Component } from 'react'
import { connect } from 'react-redux'

import NVD3Chart from 'react-nvd3'

import { calculateFromInputs } from '../utils/calculator'

import _ from 'lodash'

import {
  UI_CHART_INCOME_SENSITIVITY_TYPE_ABS_DOLLARS,
  UI_CHART_INCOME_SENSITIVITY_TYPE_DIFF_DOLLARS,
  UI_CHART_INCOME_SENSITIVITY_TYPE_ABS_RATE,
  UI_CHART_INCOME_SENSITIVITY_TYPE_DIFF_RATE
} from '../actions/ui'

const fancyRound = (x,roundType=null) => {
  if(x == 0){
    return 0
  }
  
  // for nearest power of 10 below X, choose closest of 1x, 2.5x, 5x or 10x
  const xAbs = Math.abs(x)
  const xSign = Math.sign(x)
  
  const multFactor = 2.5/2.0 // i.e. map [ 1, 2, 4, 8 ] to [ 1, 2.5, 5, 10 ]

  const nearestPowerOf10 = Math.pow(10, Math.floor(Math.log10(xAbs)))
  const scaledPowerOf2 = Math.log(xAbs/nearestPowerOf10/multFactor) / Math.log(2)
  
  let scaledPowerOf2Rounded = null
  
  
  if(roundType == 1) {
    scaledPowerOf2Rounded = Math.ceil( scaledPowerOf2 )
  }
  else if(roundType == -1) {
    scaledPowerOf2Rounded = Math.floor( scaledPowerOf2 )
  }
  else {
    scaledPowerOf2Rounded = Math.round( scaledPowerOf2 )
  }
  
  return xSign * nearestPowerOf10 * Math.pow(2,scaledPowerOf2Rounded) * multFactor    
}

const getData = ({input,field,absOrDiffs}) => {
  const xStep = fancyRound(input.grossIncome * 0.05)
  const numSteps = Math.ceil(input.grossIncome * 2 / xStep)
  
  const currentValue = calculateFromInputs(input,'Current')[field]
  const stateTaxRate = input.stateLocalIncomeTaxes / input.grossIncome
  let retval = []
  
  if(absOrDiffs) {
    retval = [{ key: 'Current', values: [] }]
  }
  
  retval = retval.concat([
    { key: 'Senate', values: [] },
    { key: 'House', values: [] },
  ])
  
  let dataCurrent = []
  let dataHouse = []
  let dataSenate = []
  let maxY = null
  let minY = 0
  
  for( var n = 0; n <= numSteps; n++ ) {
    const thisGrossIncome = n * xStep
    let thisInput = Object.assign({},input,{grossIncome: thisGrossIncome, stateLocalIncomeTaxes:stateTaxRate*thisGrossIncome})
    const resultCurrent = calculateFromInputs(thisInput,'Current')
    const resultHouse = calculateFromInputs(thisInput,'House')
    const resultSenate = calculateFromInputs(thisInput,'Senate')
    
    if(absOrDiffs) {
      retval[0].values.push([thisGrossIncome, resultCurrent[field]])
      retval[1].values.push([thisGrossIncome, resultSenate[field]])
      retval[2].values.push([thisGrossIncome, resultHouse[field]])
    }
    else {
      retval[0].values.push([thisGrossIncome, resultSenate[field] - resultCurrent[field]])
      retval[1].values.push([thisGrossIncome, resultHouse[field] - resultCurrent[field]])
    }
    
  }
  
  const allYValues = _.filter(
    _.flatten(
      retval.map((r) => r.values).map((v) => v.map((d) => d[1]))
    ),
    (val) => !isNaN(val)
  )
  
  return({
    datum: retval,
    xStep: xStep,
    currentLevel: currentValue,
    maxX: xStep * numSteps,
    maxY: fancyRound(_.max(allYValues),1),
    minY: fancyRound(_.min(allYValues),1)
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
      .style("stroke", "#2185d0")
      .style("stroke-dasharray", "3,3")
      .style("stroke-width", "2")
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
    setTimeout(this._addLine.bind(this),250)      
  }
  
  componentDidMount() {
    setTimeout(this._addLine.bind(this),250)
  }
  
  render() {
    const {input,ui} = this.props
    this.chartIncomeSensitivityType = ui.chartIncomeSensitivityType
    this.absOrDiffs = [
          UI_CHART_INCOME_SENSITIVITY_TYPE_ABS_RATE,
          UI_CHART_INCOME_SENSITIVITY_TYPE_ABS_DOLLARS
        ].includes(ui.chartIncomeSensitivityType)
    this.rateOrDollars = [
          UI_CHART_INCOME_SENSITIVITY_TYPE_ABS_RATE,
          UI_CHART_INCOME_SENSITIVITY_TYPE_DIFF_RATE
        ].includes(ui.chartIncomeSensitivityType)
    this.data = getData({
      input,
      field: this.rateOrDollars ? 'EffectiveTaxRateOnGross' : 'TotalTax',
      absOrDiffs: this.absOrDiffs
    })
    
    const yAxis = this.rateOrDollars ?
      {
        tickFormat: (d) => { return d3.format(",")(_.round(d*100,1)) + '%' },
        axisLabel: this.absOrDiffs ? 'Rate' : 'Rate Impact'
      } 
    :
      {
        tickFormat: (d) => { return '$' + d3.format(",")(Math.round(d)) },
        axisLabel: this.absOrDiffs ? 'Tax' : 'Tax Impact'
      }
    
    this.xDomain = [0,this.data.maxX]
    this.yDomain = [this.data.minY,this.data.maxY]
    
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