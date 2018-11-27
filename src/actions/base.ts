import { SecureStore } from 'expo'
export const CHECK_LOGIN_KEY = 'CHECK_LOGIN_KEY'
export const LOGIN_KEY_VERIFY = 'LOGIN_KEY_VERIFY'
export const GOTO_LOGIN = 'GOTO_LOGIN'

export const checkLogin =
    () =>
        (dispatch: any) => {
            SecureStore.getItemAsync('loginKey').then(p => {
                if (p)
                    dispatch(verifyLogin(p))
                else
                    dispatch(gotoLogin())
            })
        }

export const verifyLogin = (p: string) =>
    (dispatch: any) => {
        fetch(`http://readers.com.pk/api.php/user?filter=loginHash,eq,${p}`)
            .then((res: any) => {
                console.log(res)
                dispatch
            })
    }

export const gotoLogin = () => ({ type: GOTO_LOGIN })