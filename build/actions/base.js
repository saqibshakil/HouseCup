import { SecureStore } from 'expo';
import { RENAVIGATE } from '../contants/login';
export const CHECK_LOGIN_KEY = 'CHECK_LOGIN_KEY';
export const LOGIN_KEY_VERIFY = 'LOGIN_KEY_VERIFY';
export const GOTO_LOGIN = 'GOTO_LOGIN';
export const checkLogin = () => (dispatch) => {
    SecureStore.getItemAsync('loginKey').then(p => {
        if (p)
            dispatch(verifyLogin(p));
        else
            dispatch(gotoLogin());
    });
};
export const verifyLogin = (p) => (dispatch) => {
    fetch(`http://readers.com.pk/api.php/user?filter=loginHash,eq,${p}`)
        .then((res) => {
        console.log(res);
    });
};
export const navigateTo = (to, params) => ({
    type: RENAVIGATE,
    to,
    params
});
export const gotoLogin = () => ({ type: GOTO_LOGIN });
//# sourceMappingURL=base.js.map