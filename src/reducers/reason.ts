import { CACHE_REASONS } from "../contants/login";

export default (state: any = {}, action: any) => {
    switch (action.type) {

        case CACHE_REASONS:
            return {
                ...state,
                reasons: action.reasons,
            }


        default:
            return state
    }
}