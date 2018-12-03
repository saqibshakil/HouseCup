import { TEACHER_RESOLVE_KEYCODE, TEACHER_RESOLVE_KEYCODE_SUCCESS, TEACHER_RESOLVE_KEYCODE_FAILED, TEACHER_CLEAR } from '../contants/teacherSignUp';
export default (state = {}, action) => {
    switch (action.type) {
        case TEACHER_RESOLVE_KEYCODE:
            return Object.assign({}, state, { loading: true, errorOccured: false });
        case TEACHER_RESOLVE_KEYCODE_FAILED:
            return Object.assign({}, state, { loading: false, errorOccured: true });
        case TEACHER_RESOLVE_KEYCODE_SUCCESS: {
            const { teacher } = action;
            return Object.assign({}, state, { teacher, loading: false });
        }
        case TEACHER_CLEAR:
            return Object.assign({}, state, { teacher: null });
        default:
            return state;
    }
};
//# sourceMappingURL=teacherSignUp.js.map