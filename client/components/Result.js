import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import formatNumber from 'format-number'

const Result = ({calculate}) => {
  return(
    <table>
      {
        _.map(calculate,(v,k) => {
          return(
            <tr>
              <td>{k}</td>
              <td>{v}</td>
            </tr>
          )
        })
      }
    </table>
  )
}

const mapStateToProps = (state) => {
  return({
    calculate: state.calculate
  })
}

export default connect(mapStateToProps)(Result)