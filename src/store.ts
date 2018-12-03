import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers/index'; //Import the reducer
 
const middlewares = [thunk];
const enhancer = composeWithDevTools({
  // Options: https://github.com/jhen0409/react-native-#options
})(applyMiddleware(...middlewares));

// Connect our store to the reducers
export default createStore(reducers, enhancer);