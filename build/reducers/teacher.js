import { CACHE_TEACHERS } from '../contants/login';
import { SCHOOL_REMOVE_TEACHER } from '../contants/schoolSignUp';
export default (state = { teachers: [] }, action) => {
    switch (action.type) {
        case CACHE_TEACHERS:
            return Object.assign({}, state, { teachers: action.teachers });
        case SCHOOL_REMOVE_TEACHER:
            return Object.assign({}, state, { teachers: [
                    ...state.teachers.filter((p) => p.email !== action.email)
                ] });
        default:
            return state;
    }
};
//# sourceMappingURL=teacher.js.map