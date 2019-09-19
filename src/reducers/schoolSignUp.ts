import {
    SCHOOL_ADD_ADMIN, SCHOOL_ADD_HOUSE, SCHOOL_ADD_TEACHER,
    SCHOOL_CREATE, CALL_FAILED, CALL_STARTED, CALL_DONE
} from '../contants/schoolSignUp'
import { BACK } from '../contants/login';

let dataState = {
}

export default (state: any = dataState, action: any) => {
    switch (action.type) {
        case SCHOOL_CREATE:
            return {
                ...state,
                school: { ...action.school }
            }

        case SCHOOL_ADD_ADMIN:
            return {
                ...state,
                admin: { ...action.admin }
            }

        case SCHOOL_ADD_HOUSE:
            return {
                ...state,
                houses: [
                    ...state.houses,
                    action.house
                ]
            }
        case SCHOOL_ADD_TEACHER:
            return {
                ...state,
                teachers: [
                    ...state.teachers,
                    { email: action.email }
                ]
            }
        case CALL_STARTED:
            return {
                ...state,
                saving: true,
                error: undefined
            }
        case CALL_FAILED:
            return {
                ...state,
                saving: false,
                error: action.error === 409 ? 'Email Already used' : 'Unable to sign you up please try again later'
            }
        case CALL_DONE:
            return {
                message: action.message
            }
        case BACK:
            return {
                ...state,
                saving: false

            }
        default:
            return state;
    }
};