import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../rootReducer'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState = {}) {
  preloadedState = {
    input: {
      grossIncome: 60000,
      filingStatus: 'single',
      itemize: false,
      dependentChildrenCount: 2,
      mortgageInterest: 0,
      charitableDonations: 0,
      stateLocalPropertyTaxes: 0,
      stateLocalIncomeTaxes: 0,
      personalExemptions: 0
    }  
  }
  
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
