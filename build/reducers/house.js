import { CACHE_HOUSES } from '../contants/login';
import { SCHOOL_REMOVE_HOUSE } from '../contants/schoolSignUp';
export default (state = {}, action) => {
    switch (action.type) {
        case CACHE_HOUSES:
            return Object.assign({}, state, { houses: action.houses });
        case SCHOOL_REMOVE_HOUSE:
            return Object.assign({}, state, { houses: [
                    ...state.houses.filter((p) => p.id !== action.id)
                ] });
        default:
            return state;
    }
};
//# sourceMappingURL=house.js.map