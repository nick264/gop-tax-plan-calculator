import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../rootReducer'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState = {}) {
  preloadedState = {
    input: {
      grossIncome: null,
      filingStatus: null,
      itemize: null,
      dependentChildrenCount: 0,
      mortgageInterest: 0,
      charitableDonations: 0,
      stateLocalPropertyTaxes: 0,
      stateLocalIncomeTaxes: 0,
      personalExemptions: 0
    }  
  }

  // preloadedState = {
  //   input: {
  //     grossIncome: 60000,
  //     filingStatus: 'single',
  //     itemize: false,
  //     dependentChildrenCount: 0,
  //     mortgageInterest: 0,
  //     charitableDonations: 0,
  //     stateLocalPropertyTaxes: 0,
  //     stateLocalIncomeTaxes: 0,
  //     personalExemptions: 0
  //   },
  //   ui: {
  //     resultsVisible: true,
  //     detailsVisible: true
  //   }
  // }
  
  if (process.env.NODE_ENV !== 'production') {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
      ),
    )
  } else {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
      ),
    )
  }
}
