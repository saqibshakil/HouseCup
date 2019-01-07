import { getPointsPerHouses, create, studentExist, fetchStudent as _fetchStudent, postPoints as _postPoints } from '../api/home';
import { CALL_STARTED, CALL_FAILED, CALL_DONE } from '../contants/schoolSignUp';
import { FETCH_HOUSE_POINTS, FETCH_STUDENT } from '../contants/home';
import { navigateTo } from './base';
export const createStudent = (values) => (dispatch, getState) => {
    dispatch({
        type: CALL_STARTED
    });
    const id = getState().login.schoolId;
    create(id, values).then((p) => {
        dispatch({
            type: CALL_DONE
        });
        dispatch({
            type: FETCH_STUDENT,
            student: p
        });
        dispatch(navigateTo('SelectReason'));
    })
        .catch((error) => {
        dispatch({
            type: CALL_FAILED, error
        });
    });
};
export const fetchPoints = (schoolId) => (dispatch) => {
    dispatch({
        type: CALL_STARTED
    });
    getPointsPerHouses(schoolId)
        .then(points => {
        dispatch({
            type: FETCH_HOUSE_POINTS,
            points
        });
        dispatch({
            type: CALL_DONE
        });
    }).catch(() => dispatch({
        type: CALL_FAILED,
        error: 'Unable to fetch points'
    }));
};
export const fetchStudent = (student, schoolId) => (dispatch) => {
    dispatch({
        type: CALL_STARTED
    });
    _fetchStudent(student, schoolId)
        .then(std => {
        dispatch({
            type: FETCH_STUDENT,
            student: std
        });
        dispatch({
            type: CALL_DONE
        });
    }).catch(() => dispatch({
        type: CALL_FAILED,
        error: 'Unable to Student'
    }));
};
export const fetchStudentAndUpdate = (fieldProps, value) => (dispatch, getState) => {
    const { form: { setFieldValue } } = fieldProps;
    const state = getState();
    studentExist({ grNo: value }, state.login.schoolId)
        .then((std) => {
        if (std) {
            dispatch({
                type: FETCH_STUDENT,
                student: std
            });
            setFieldValue('name', std.name);
            setFieldValue('class', std.class);
            setFieldValue('houseId', std.houseId);
            setFieldValue('id', std.id);
        }
        else {
            setFieldValue('id', undefined);
            setFieldValue('name', '');
            setFieldValue('class', '');
            setFieldValue('houseId', 0);
        }
    }).catch(() => dispatch({
        type: CALL_FAILED,
        error: 'Unable to Student'
    }));
};
export const postPoints = (obj) => (dispatch, getState) => {
    const { login: { teacherId, schoolId }, home: { student: { id: studentId, houseId } } } = getState();
    dispatch({ type: CALL_STARTED });
    _postPoints(Object.assign({}, obj, { teacherId,
        schoolId,
        studentId,
        houseId })).then(() => {
        dispatch({
            type: CALL_DONE
        });
        dispatch(fetchPoints(schoolId));
        dispatch(navigateTo('Home'));
    }).catch(() => dispatch({
        type: CALL_FAILED,
        error: 'Unable to post points'
    }));
};
//# sourceMappingURL=home.js.map