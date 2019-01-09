import { SecureStore } from 'expo'
import { RENAVIGATE, BACK, POPTOTOP } from '../contants/login';
export const CHECK_LOGIN_KEY = 'CHECK_LOGIN_KEY'
export const LOGIN_KEY_VERIFY = 'LOGIN_KEY_VERIFY'
export const GOTO_LOGIN = 'GOTO_LOGIN'

export const setLoginKey = (loginHash: string) => {
    SecureStore.setItemAsync('loginKey', loginHash)
}

export const clearLoginKey = () => {
    SecureStore.deleteItemAsync('loginKey')
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
