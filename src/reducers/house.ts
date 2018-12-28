import { CACHE_HOUSES } from '../contants/login';
import { SCHOOL_REMOVE_HOUSE } from '../contants/schoolSignUp';

export default (state: any = {}, action: any) => {
    switch (action.type) {

        case CACHE_HOUSES:
            return {
                ...state,
                houses: action.houses
            }

        case SCHOOL_REMOVE_HOUSE:
            return {
                ...state,
                houses: [
                    ...state.houses.filter((p: any) => p.id !== action.id)
                ]
            }
        default:
            return state
    }
}