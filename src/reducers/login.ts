import { TEACHER_LOGIN, TEACHER_LOGGEDIN, TEACHER_LOGIN_FAILED } from '../contants/login';

export default (state: any = {}, action: any) => {
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
                userId: action.id,
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
