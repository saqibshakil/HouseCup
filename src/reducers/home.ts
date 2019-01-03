import { FETCH_HOUSE_POINTS, FETCH_STUDENT } from '../contants/home';

export default (state: any = { points: [] }, action: any) => {
    switch (action.type) {

        case FETCH_HOUSE_POINTS:
            return {
                ...state,
                points: action.points
            }

        case FETCH_STUDENT:
            return {
                ...state,
                student: action.student
            }
        default:
            return state
    }
}