import { FETCH_HOUSE_POINTS, FETCH_STUDENT } from '../contants/home';
import { SCAN_UNSUCCESSFULL } from '../contants/schoolSignUp';

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
            case SCAN_UNSUCCESSFULL:
                return {
                    ...state,
                    scanFailed: action.register
                }
        default:
            return state
    }
}