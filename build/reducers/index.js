import { combineReducers } from 'redux';
import base from '../reducers/base';
// Combine all the reducers
const rootReducer = combineReducers({
    base
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});
export default rootReducer;
//# sourceMappingURL=index.js.map