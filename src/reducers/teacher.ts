import { CACHE_TEACHERS } from '../contants/login';
import { SCHOOL_REMOVE_TEACHER } from '../contants/schoolSignUp';

export default (state: any = { teachers: [] }, action: any) => {
    switch (action.type) {

        case CACHE_TEACHERS:
            return {
                ...state,
                teachers: action.teachers
            }
        case SCHOOL_REMOVE_TEACHER:
            return {
                ...state,
                teachers: [
                    ...state.teachers.filter((p: any) => p.email !== action.email)
                ]
            }

        default:
            return state
    }
}