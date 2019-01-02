import { fetchStudentOrCreate, getPointsPerHouses } from '../api/home';
import { CALL_STARTED, CALL_FAILED, CALL_DONE } from '../contants/schoolSignUp';
import { FETCH_HOUSE_POINTS, STUDENT_SELECTED } from '../contants/home'

export const createStudent = (values: any) => (dispatch: any, getState: any) => {
    dispatch({
        type: CALL_STARTED
    })
    const id = getState().login.schoolId
    fetchStudentOrCreate(values, id).then(() => {
        dispatch({
            type: CALL_DONE
        })
        dispatch({
            type: STUDENT_SELECTED
        })
    })
        .catch((error: string) => {
            dispatch({
                type: CALL_FAILED, error
            })
        })
}

export const fetchPoints = (schoolId: any) => (dispatch: any) => {
    dispatch({
        type: CALL_STARTED
    })
    getPointsPerHouses(schoolId)
        .then(points => {
            dispatch({
                type: FETCH_HOUSE_POINTS,
                points
            })
            dispatch({
                type: CALL_DONE
            })
        }).catch(p => dispatch({
            type: CALL_FAILED,
            error: 'Unable to fetch points'
        }))
}