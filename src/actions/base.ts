import { SecureStore } from 'expo'
import { RENAVIGATE, BACK, POPTOTOP } from '../contants/login';
export const CHECK_LOGIN_KEY = 'CHECK_LOGIN_KEY'
export const LOGIN_KEY_VERIFY = 'LOGIN_KEY_VERIFY'
export const GOTO_LOGIN = 'GOTO_LOGIN'

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

export const verifyLogin = (p: string) =>
    (dispatch: any) => {
        fetch(`http://readers.com.pk/api.php/user?filter=loginHash,eq,${p}`)
            .then((res: any) => {
                dispatch()
                console.log(res)
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