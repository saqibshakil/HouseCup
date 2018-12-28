import {
    SCHOOL_ADD_ADMIN, SCHOOL_ADD_HOUSE, SCHOOL_ADD_TEACHER,
    SCHOOL_CREATE, SCHOOL_POST_FAILED, SCHOOL_POST_STARTED, SCHOOL_POSTED, SCHOOL_REMOVE_HOUSE
} from '../contants/schoolSignUp'

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
        case SCHOOL_POST_STARTED:
            return {
                ...state,
                saving: true,
                error: undefined
            }
        case SCHOOL_POST_FAILED:
            return {
                ...state,
                saving: false,
                error: action.error === 409 ? 'Email Already used' : 'Unable to sign you up please try again later'
            }
        case SCHOOL_POSTED:
            return {
                message: 'Your school has been signed up.You will recieve an email from our admin soon'
            }
        default:
            return state;
    }
};