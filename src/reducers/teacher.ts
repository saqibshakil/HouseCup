import { CACHE_TEACHERS } from "../contants/login";

export default (state: any = {}, action: any) => {
    switch (action.type) {

        case CACHE_TEACHERS:
            return {
                ...state,
                teachers: action.teachers,
            }


        default:
            return state
    }
}