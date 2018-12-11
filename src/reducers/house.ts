import { CACHE_HOUSES } from "../contants/login";

export default (state: any = {}, action: any) => {
    switch (action.type) {

        case CACHE_HOUSES:
            return {
                ...state,
                houses: action.houses
            }


        default:
            return state
    }
}