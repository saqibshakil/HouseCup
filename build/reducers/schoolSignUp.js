import { SCHOOL_ADD_ADMIN, SCHOOL_ADD_HOUSE, SCHOOL_ADD_TEACHER, SCHOOL_CREATE, SCHOOL_POST_FAILED, SCHOOL_POST_STARTED, SCHOOL_POSTED } from '../contants/schoolSignUp';
let dataState = {};
export default (state = dataState, action) => {
    switch (action.type) {
        case SCHOOL_CREATE:
            return Object.assign({}, state, { school: Object.assign({}, action.school) });
        case SCHOOL_ADD_ADMIN:
            return Object.assign({}, state, { admin: Object.assign({}, action.admin) });
        case SCHOOL_ADD_HOUSE:
            return Object.assign({}, state, { houses: [
                    ...state.houses,
                    action.house
                ] });
        case SCHOOL_ADD_TEACHER:
            return Object.assign({}, state, { teachers: [
                    ...state.teachers,
                    { email: action.email }
                ] });
        case SCHOOL_POST_STARTED:
            return Object.assign({}, state, { saving: true, error: undefined });
        case SCHOOL_POST_FAILED:
            return Object.assign({}, state, { saving: false, error: action.error === 409 ? 'Email Already used' : 'Unable to sign you up please try again later' });
        case SCHOOL_POSTED:
            return {
                message: 'Your school has been signed up.You will recieve an email from our admin soon'
            };
        default:
            return state;
    }
};
//# sourceMappingURL=schoolSignUp.js.map