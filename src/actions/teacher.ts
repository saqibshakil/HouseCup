import {
    TEACHER_RESOLVE_KEYCODE, TEACHER_RESOLVE_KEYCODE_FAILED, TEACHER_RESOLVE_KEYCODE_SUCCESS,
    TEACHER_SAVE, TEACHER_SAVE_FAILED, TEACHER_SAVE_SUCCESS, TEACHER_CLEAR
} from '../contants/teacherSignUp'

import * as api from '../api/teacher'
import { Toast } from 'native-base'
import { cacheData, reCacheTeachers } from './login';
import { CALL_STARTED, CALL_DONE, CALL_FAILED } from '../contants/schoolSignUp';
import { back } from './base';

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
                    text: 'Key Code is invalid or already used up',
                    position: 'bottom',
                    type: 'danger'
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
                dispatch(cacheData(teacher))
            })
            .catch((p) => {
                Toast.show({
                    text: 'Unexpected error, please try again in a few minutes',
                    position: 'top',
                    type: 'danger'
                })
                dispatch({ type: TEACHER_SAVE_FAILED, p })
            })
    }

export const resetPassword = (teacher: any) => (dispatch: (arg: { type: string } & any) => void) => {
    dispatch({
        type: CALL_STARTED
    })
    api.resetUser(teacher)
        .then(() => {
            dispatch({ type: CALL_DONE })
            dispatch(reCacheTeachers(teacher.schoolId))
            dispatch(back())
        }).catch((err: string) => {
            dispatch({ type: CALL_FAILED, error: err })
        })
}