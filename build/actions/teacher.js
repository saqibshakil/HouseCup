import { TEACHER_RESOLVE_KEYCODE, TEACHER_RESOLVE_KEYCODE_FAILED, TEACHER_RESOLVE_KEYCODE_SUCCESS, TEACHER_SAVE, TEACHER_SAVE_FAILED, TEACHER_SAVE_SUCCESS, TEACHER_CLEAR } from '../contants/teacherSignUp';
import * as api from '../api/teacher';
import { Toast } from 'native-base';
import { TEACHER_LOGGEDIN } from '../contants/login';
export const loadTeacherByKeyCode = (keyCode) => (dispatch) => {
    dispatch({ type: TEACHER_RESOLVE_KEYCODE, keyCode });
    api.loadTeacherByKeyCode(keyCode)
        .then((teacher) => {
        dispatch({ type: TEACHER_RESOLVE_KEYCODE_SUCCESS, teacher });
    })
        .catch((p) => {
        Toast.show({
            text: 'Key Code is invalid or already used up',
            position: 'bottom',
            type: 'danger'
        });
        dispatch({ type: TEACHER_RESOLVE_KEYCODE_FAILED, p });
    });
};
export const clearTeacher = () => ({ type: TEACHER_CLEAR });
export const updatePasswordAndLogin = (user) => (dispatch) => {
    dispatch({ type: TEACHER_SAVE });
    api.updateTeacher(user)
        .then((teacher) => {
        dispatch({ type: TEACHER_SAVE_SUCCESS, teacher });
        dispatch({ type: TEACHER_LOGGEDIN, teacher });
    })
        .catch((p) => {
        Toast.show({
            text: 'Unexpected error, please try again in a few minutes',
            position: 'top',
            type: 'danger'
        });
        dispatch({ type: TEACHER_SAVE_FAILED, p });
    });
};
//# sourceMappingURL=teacher.js.map