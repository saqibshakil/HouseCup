import { TEACHER_LOGIN, TEACHER_LOGGEDIN, TEACHER_LOGIN_FAILED } from '../contants/login';
const defaultState = {
    loading: false,
    errorOccured: false
}
export default (state: any = defaultState, action: any) => {
    switch (action.type) {

        case TEACHER_LOGIN:
            return {
                ...state,
                loading: true,
                errorOccured: false
            }

        case TEACHER_LOGGEDIN:
            return {
                ...state,
                loading: false,
                schoolId: action.schoolId,
                teacherId: action.teacherId,
                loginHash: action.loginHash
            }

        case TEACHER_LOGIN_FAILED:
            return {
                ...state,
                user: action.teacher,
                errorOccured: true,
                loading: false
            }

        default:
            return state;

    }
}
