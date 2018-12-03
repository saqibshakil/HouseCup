import { combineReducers } from 'redux';
import base from '../reducers/base';
import { reducer as form } from 'redux-form';
import schoolSignUp from './schoolSignUp';
import teacherSignUp from './teacherSignUp';
// Combine all the reducers
const rootReducer = combineReducers({
    base,
    form,
    schoolSignUp,
    teacherSignUp
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});
export default rootReducer;
//# sourceMappingURL=index.js.map