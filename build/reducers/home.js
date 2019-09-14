import { FETCH_HOUSE_POINTS, FETCH_STUDENT } from '../contants/home';
import { SCAN_UNSUCCESSFULL } from '../contants/schoolSignUp';
export default (state = { points: [] }, action) => {
    switch (action.type) {
        case FETCH_HOUSE_POINTS:
            return Object.assign({}, state, { points: action.points });
        case FETCH_STUDENT:
            return Object.assign({}, state, { student: action.student });
        case SCAN_UNSUCCESSFULL:
            return Object.assign({}, state, { scanFailed: action.register });
        default:
            return state;
    }
};
//# sourceMappingURL=home.js.map