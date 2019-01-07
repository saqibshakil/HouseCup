import {
    getPointsPerHouses, create,
    studentExist, fetchStudent as _fetchStudent, postPoints as _postPoints
} from '../api/home';
import { CALL_STARTED, CALL_FAILED, CALL_DONE } from '../contants/schoolSignUp';
import { FETCH_HOUSE_POINTS, FETCH_STUDENT } from '../contants/home'
import { FieldProps } from 'formik';
import { navigateTo } from './base';

export const createStudent = (values: any) => (dispatch: any, getState: any) => {
    dispatch({
        type: CALL_STARTED
    })
    const id = getState().login.schoolId
    create(id, values).then((p: any) => {
        dispatch({
            type: CALL_DONE
        })

        dispatch({
            type: FETCH_STUDENT,
            student: p
        })

        dispatch(navigateTo('SelectReason'))
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
        }).catch(() => dispatch({
            type: CALL_FAILED,
            error: 'Unable to fetch points'
        }))
}

export const fetchStudent = (student: any, schoolId: any) => (dispatch: any) => {
    dispatch({
        type: CALL_STARTED
    })
    _fetchStudent(student, schoolId)
        .then(std => {
            dispatch({
                type: FETCH_STUDENT,
                student: std
            })
            dispatch({
                type: CALL_DONE
            })
        }).catch(() => dispatch({
            type: CALL_FAILED,
            error: 'Unable to Student'
        }))
}

export const fetchStudentAndUpdate = (fieldProps: FieldProps<any>, value: string) => (dispatch: any, getState: () => any) => {
    const {
        form: { setFieldValue }
    } = fieldProps;
    const state = getState()
    studentExist({ grNo: value }, state.login.schoolId)
        .then((std: any) => {
            if (std) {
                dispatch({
                    type: FETCH_STUDENT,
                    student: std
                })
                setFieldValue('name', std.name)
                setFieldValue('class', std.class)
                setFieldValue('houseId', std.houseId)
                setFieldValue('id', std.id)
            } else {
                setFieldValue('id', undefined)
                setFieldValue('name', '')
                setFieldValue('class', '')
                setFieldValue('houseId', 0)
            }

        }).catch(() => dispatch({
            type: CALL_FAILED,
            error: 'Unable to Student'
        }))
}

export const postPoints = (obj: { points: number, reasonId: any }) =>
    (dispatch: any, getState: any) => {
        const { login: { teacherId, schoolId }, home: { student: { id: studentId, houseId } } } = getState()
        dispatch({ type: CALL_STARTED })
        _postPoints({
            ...obj,
            teacherId,
            schoolId,
            studentId,
            houseId

        }).then(() => {
            dispatch({
                type: CALL_DONE
            })
            dispatch(fetchPoints(schoolId))
            dispatch(navigateTo('Home'))
        }).catch(() => dispatch({
            type: CALL_FAILED,
            error: 'Unable to post points'
        }))
    }