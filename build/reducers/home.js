import { FETCH_HOUSE_POINTS } from '../contants/home';
export default (state = { points: [] }, action) => {
    switch (action.type) {
        case FETCH_HOUSE_POINTS:
            return Object.assign({}, state, { points: action.points });
        default:
            return state;
    }
};
//# sourceMappingURL=home.js.map