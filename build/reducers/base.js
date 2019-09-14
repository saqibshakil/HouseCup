import { CHECK_LOGIN_KEY, GOTO_LOGIN } from '../actions/base';
import { RENAVIGATE, BACK, POPTOTOP } from '../contants/login';
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
            return Object.assign({}, state, { navigateTo: action.to, params: action.params, back: false, popToTop: false });
        case BACK:
            return Object.assign({}, state, { navigateTo: '', params: undefined, back: true, popToTop: false });
        case POPTOTOP:
            return Object.assign({}, state, { navigateTo: '', params: undefined, back: false, popToTop: true });
        default:
            return state;
    }
};
//# sourceMappingURL=base.js.map