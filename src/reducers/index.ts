import { combineReducers } from 'redux';
import base from '../reducers/base'
import { reducer as form } from 'redux-form'
import schoolSignUp from './schoolSignUp';
// Combine all the reducers
const rootReducer = combineReducers({
    base,
    form,
    schoolSignUp
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;