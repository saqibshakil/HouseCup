import { FETCH_HOUSE_POINTS } from '../contants/home';

export default (state: any = { points: [] }, action: any) => {
    switch (action.type) {

        case FETCH_HOUSE_POINTS:
            return {
                ...state,
                points: action.points
            }

        default:
            return state
    }
}