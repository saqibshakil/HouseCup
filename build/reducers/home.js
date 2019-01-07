import { FETCH_HOUSE_POINTS, FETCH_STUDENT } from '../contants/home';
export default (state = { points: [] }, action) => {
    switch (action.type) {
        case FETCH_HOUSE_POINTS:
            return Object.assign({}, state, { points: action.points });
        case FETCH_STUDENT:
            return Object.assign({}, state, { student: action.student });
        default:
            return state;
    }
};
//# sourceMappingURL=home.js.map