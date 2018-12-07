import {
    TEACHER_LOGIN, TEACHER_LOGGEDIN, TEACHER_LOGIN_FAILED
} from '../contants/login'

import * as api from '../api/login'
import { Toast } from 'native-base';

export const login = (email: string, password: string) =>
    (dispatch: any) => {
        dispatch({ type: TEACHER_LOGIN, email, password })
        api.login(email, password)
            .then((success: any) => {
                dispatch({ type: TEACHER_LOGGEDIN, ...success })
            })
            .catch((p) => {
                Toast.show({
                    text: p || 'Email or password do not match',
                    position: 'bottom',
                    type: 'danger'
                })
                dispatch({ type: TEACHER_LOGIN_FAILED, p })
            })
    }
