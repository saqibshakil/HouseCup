import { CHECK_LOGIN_KEY, GOTO_LOGIN } from '../actions/base';
import { RENAVIGATE } from '../contants/login';
let dataState = {
    loading: true,
    loginHash: '',
    navigateTo: 'Loading'
};
export default (state = dataState, action) => {
    switch (action.type) {
        case CHECK_LOGIN_KEY:
            return Object.assign({}, state, { loading: true });
        case GOTO_LOGIN:
            return Object.assign({}, state, { loading: false, navigateTo: 'PreLogin' });
        case RENAVIGATE:
            return Object.assign({}, state, { navigateTo: action.to, params: action.params });
        default:
            return state;
    }
};
//# sourceMappingURL=base.js.map