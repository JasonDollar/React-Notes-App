import { createStore, applyMiddleware } from 'redux';

import thunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware))
)

export { store }

