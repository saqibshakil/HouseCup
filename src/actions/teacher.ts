import {
    TEACHER_RESOLVE_KEYCODE, TEACHER_RESOLVE_KEYCODE_FAILED, TEACHER_RESOLVE_KEYCODE_SUCCESS,
    TEACHER_SAVE, TEACHER_SAVE_FAILED, TEACHER_SAVE_SUCCESS, TEACHER_CLEAR, TEACHER_LOGGEDIN
} from '../contants/teacherSignUp'

import * as api from '../api/teacher'
import { Toast } from 'native-base';

export const loadTeacherByKeyCode = (keyCode: string) =>
    (dispatch: any) => {
        dispatch({ type: TEACHER_RESOLVE_KEYCODE, keyCode })
        api.loadTeacherByKeyCode(keyCode)
            .then((teacher) => {
                dispatch({ type: TEACHER_RESOLVE_KEYCODE_SUCCESS, teacher }
                )
            })
            .catch((p) => {
                Toast.show({
                    text: "Key Code is invalid or already used up",
                    position: 'bottom',
                    type: 'danger',
                })
                dispatch({ type: TEACHER_RESOLVE_KEYCODE_FAILED, p })
            })
    }

export const clearTeacher = () => ({ type: TEACHER_CLEAR })

export const updatePasswordAndLogin = (user: any) =>
    (dispatch: any) => {
        dispatch({ type: TEACHER_SAVE })
        api.updateTeacher(user)
            .then((teacher) => {
                dispatch({ type: TEACHER_SAVE_SUCCESS, teacher })
                dispatch({ type: TEACHER_LOGGEDIN, teacher })
            })
            .catch((p) => {
                Toast.show({
                    text: "Unexpected error, please try again in a few minutes",
                    position: 'top',
                    type: 'danger'
                })
                dispatch({ type: TEACHER_SAVE_FAILED, p })
            })
    }