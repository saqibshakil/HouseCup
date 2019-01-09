import { CHECK_LOGIN_KEY, GOTO_LOGIN } from '../actions/base'
import { RENAVIGATE, BACK, POPTOTOP } from '../contants/login';

let dataState: any = {
    loading: true,
    loginHash: '',
    navigateTo: 'Loading'
}

export default (state = dataState, action: any) => {
    switch (action.type) {
        case CHECK_LOGIN_KEY:
            return {
                ...state,
                loading: true
            }

        case GOTO_LOGIN:
            return {
                ...state,
                loading: false,
                navigateTo: 'PreLogin'
            }
        case RENAVIGATE:
            return {
                ...state,
                navigateTo: action.to,
                params: action.params,
                back: false,
                popToTop: false
            }
        case BACK:
            return {
                ...state,
                navigateTo: '',
                params: undefined,
                back: true,
                popToTop: false
            }
        case POPTOTOP:
            return {
                ...state,
                navigateTo: '',
                params: undefined,
                back: false,
                popToTop: true
            }
        default:
            return state;
    }
};