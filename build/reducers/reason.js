import { CACHE_REASONS } from "../contants/login";
export default (state = {}, action) => {
    switch (action.type) {
        case CACHE_REASONS:
            return Object.assign({}, state, { reasons: action.reasons });
        default:
            return state;
    }
};
//# sourceMappingURL=reason.js.map