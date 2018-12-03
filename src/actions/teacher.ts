import {
    TEACHER_RESOLVE_KEYCODE, TEACHER_RESOLVE_KEYCODE_FAILED, TEACHER_RESOLVE_KEYCODE_SUCCESS,
    TEACHER_SAVE, TEACHER_SAVE_FAILED, TEACHER_SAVE_SUCCESS, TEACHER_CLEAR
} from '../contants/teacherSignUp'

import * as api from "../api/teacher"


export const loadTeacherByKeyCode = (keyCode: string) =>
    (dispatch: any) => {
        
        dispatch({ type: TEACHER_RESOLVE_KEYCODE, keyCode })
        api.loadTeacherByKeyCode(keyCode)
            .then((teacher) => {
                
                dispatch({ type: TEACHER_RESOLVE_KEYCODE_SUCCESS, teacher }
                )
            })
            .catch((p) => dispatch({ type: TEACHER_RESOLVE_KEYCODE_FAILED, p }))
    }

    export const clearTeacher = () => ({ type: TEACHER_CLEAR }) 