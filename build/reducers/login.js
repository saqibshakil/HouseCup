import { TEACHER_LOGIN, TEACHER_LOGGEDIN, TEACHER_LOGIN_FAILED } from '../contants/login';
const defaultState = {
    loading: false,
    errorOccured: false
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case TEACHER_LOGIN:
            return Object.assign({}, state, { loading: true, errorOccured: false });
        case TEACHER_LOGGEDIN:
            return Object.assign({}, state, { loading: false, schoolId: action.schoolId, teacherId: action.teacherId, loginHash: action.loginHash, maxTeachers: action.maxTeachers });
        case TEACHER_LOGIN_FAILED:
            return Object.assign({}, state, { user: action.teacher, errorOccured: true, loading: false });
        default:
            return state;
    }
};
//# sourceMappingURL=login.js.map