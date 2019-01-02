import { combineReducers } from 'redux';
import base from '../reducers/base';
import schoolSignUp from './schoolSignUp';
import teacherSignUp from './teacherSignUp';
import login from './login';
import teacher from './teacher';
import house from './house';
import reason from './reason';
import home from './home';
// Combine all the reducers
const rootReducer = combineReducers({
    base,
    schoolSignUp,
    teacherSignUp,
    login,
    teacher,
    house,
    reason,
    home
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});
export default rootReducer;
//# sourceMappingURL=index.js.map