import { TEACHER_RESOLVE_KEYCODE, TEACHER_RESOLVE_KEYCODE_SUCCESS, TEACHER_RESOLVE_KEYCODE_FAILED, TEACHER_CLEAR } from '../contants/teacherSignUp'
import loading from '../screens/loading';

export default (state: any = {}, action: any) => {
    switch (action.type) {

        case TEACHER_RESOLVE_KEYCODE:
            return {
                ...state,
                loading: true,
                errorOccured: false
            }

        case TEACHER_RESOLVE_KEYCODE_FAILED:
            return {
                ...state,
                loading: false,
                errorOccured: true
            }

        case TEACHER_RESOLVE_KEYCODE_SUCCESS: {
            const { teacher } = action
            return {
                ...state,
                teacher,
                loading: false,

            }
        }

        case TEACHER_CLEAR:
            return {
                ...state,
                teacher: null
            }

        default:
            return state;

    }
}
