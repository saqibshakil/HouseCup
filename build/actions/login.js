import { TEACHER_LOGIN, TEACHER_LOGGEDIN, TEACHER_LOGIN_FAILED, CACHE_HOUSES, CACHE_REASONS, CACHE_TEACHERS, RENAVIGATE } from '../contants/login';
import * as api from '../api/login';
import { Toast } from 'native-base';
import { FETCH_HOUSE_POINTS } from '../contants/home';
export const cacheData = (success) => (dispatch) => {
    api.cacheSchoolInfo(success.schoolId).then(({ houses, reasons, teachers, points }) => {
        dispatch({
            type: CACHE_HOUSES,
            houses
        });
        dispatch({
            type: CACHE_REASONS,
            reasons
        });
        dispatch({
            type: CACHE_TEACHERS,
            teachers
        });
        dispatch({
            type: FETCH_HOUSE_POINTS,
            points
        });
        dispatch(Object.assign({ type: TEACHER_LOGGEDIN }, success));
        dispatch(reNavigate());
    });
};
export const login = (email, password) => (dispatch) => {
    dispatch({ type: TEACHER_LOGIN });
    api.login(email, password)
        .then((success) => {
        dispatch(cacheData(success));
    })
        .catch((p) => {
        Toast.show({
            text: p || 'Email or password do not match',
            position: 'bottom',
            type: 'danger'
        });
        dispatch({ type: TEACHER_LOGIN_FAILED, p });
    });
};
export const reCacheTeachers = (schoolId) => (dispatch) => {
    api.getTeacher(schoolId).then(teachers => {
        dispatch({
            type: CACHE_TEACHERS,
            teachers
        });
    });
};
export const reCacheHouses = (schoolId) => (dispatch) => {
    api.getHouses(schoolId).then(houses => {
        dispatch({
            type: CACHE_HOUSES,
            houses
        });
    });
};
export const reCacheReasons = (schoolId) => (dispatch) => {
    api.getReason(schoolId).then(reasons => {
        dispatch({
            type: CACHE_REASONS,
            reasons
        });
    });
};
export const reNavigate = () => (dispatch, getState) => {
    const state = getState();
    const teacher = state.teacher.teachers.filter((p) => p.id === state.login.teacherId)[0];
    if (teacher.isAdmin)
        dispatch({
            type: RENAVIGATE,
            to: 'Admin'
        });
    else
        dispatch({
            type: RENAVIGATE,
            to: 'Teacher'
        });
};
//# sourceMappingURL=login.js.map