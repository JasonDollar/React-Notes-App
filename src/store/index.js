import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
// import 'firebase/firestore';

import rootReducer from './reducers/'





const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      composeEnhancers(applyMiddleware(thunk))


)

// export const getStateFromStore = () => {
//   const state = store.getState()
//   if (state.firebase.auth.uid) {
//     return state.firebase.auth.uid
//   } else {
//     return ''
//   }
// }

export default store;

