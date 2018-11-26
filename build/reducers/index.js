import { combineReducers } from 'redux';
import { USERS } from "../actions/users"; //Import the actions types constant we defined in our actions
let dataState = { data: [], loading: true };
const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case USERS:
            state = Object.assign({}, state, { data: action.data, loading: false });
            return state;
        default:
            return state;
    }
};
// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});
export default rootReducer;
//# sourceMappingURL=index.js.map