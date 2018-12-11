import { combineReducers } from 'redux';
import base from '../reducers/base'
import { reducer as form } from 'redux-form'
import schoolSignUp from './schoolSignUp';
import teacherSignUp from './teacherSignUp';
import login from './login';
import teacher from './teacher';
import house from './house';
import reason from './reason';

// Combine all the reducers
const rootReducer = combineReducers({
    base,
    form,
    schoolSignUp,
    teacherSignUp,
    login,
    teacher,
    house,
    reason
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;