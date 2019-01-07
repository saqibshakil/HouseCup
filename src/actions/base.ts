import { SecureStore } from 'expo'
import { RENAVIGATE, BACK, POPTOTOP, TEACHER_LOGIN_FAILED } from '../contants/login';
import { login } from '../api/login';
import { cacheData } from './login';
import { Toast } from 'native-base';
export const CHECK_LOGIN_KEY = 'CHECK_LOGIN_KEY'
export const LOGIN_KEY_VERIFY = 'LOGIN_KEY_VERIFY'
export const GOTO_LOGIN = 'GOTO_LOGIN'

export const setLoginKey = (loginHash: string) => {
    SecureStore.setItemAsync('loginKey', loginHash)
}

export const clearLoginKey = () => {
    SecureStore.deleteItemAsync('loginKey')
}

export const verifyLogin = (p: string) =>
    (dispatch: any) => {
        login('', '', p).then((success: any) => {
            dispatch(cacheData(success))
        })
        .catch((err: string) => {
            Toast.show({
                text: err || 'Email or password do not match',
                position: 'bottom',
                type: 'danger'
            })
            dispatch({ type: TEACHER_LOGIN_FAILED, error: err })
        })
    }

export const navigateTo = (to: string, params?: any) => ({
    type: RENAVIGATE,
    to,
    params
})
export const back = () => ({
    type: BACK
})
export const popToTop = () => ({
    type: POPTOTOP
})
export const gotoLogin = () => ({ type: GOTO_LOGIN })

export const checkLogin =
    () =>
        (dispatch: any, getState: () => any) => {
            SecureStore.getItemAsync('loginKey').then(p => {
                if (p)
                    dispatch(verifyLogin(p))
                else {
                    if (getState().base.navigateTo === 'Loading')
                        dispatch(gotoLogin())
                }
            })
        }
