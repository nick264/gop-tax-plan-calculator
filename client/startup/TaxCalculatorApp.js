import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from '../store/configureStore'

import Index from '../components/Index'

const TaxCalculatorApp = (props, _railsContext) => {
  const store = configureStore(props)

  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  )
}

ReactDOM.render(
  <TaxCalculatorApp/>,
  document.getElementById('root')
);
