import { createSchool as postSchool, createAdmin as postAdmin, deleteTeacher } from '../api/school';
import { SCHOOL_ADD_ADMIN, SCHOOL_CREATE, SCHOOL_REMOVE_TEACHER, SCHOOL_ADD_TEACHER, SCHOOL_ADD_HOUSE, SCHOOL_REMOVE_HOUSE, CALL_STARTED, CALL_DONE, CALL_FAILED } from '../contants/schoolSignUp';
import { reCacheTeachers } from './login';
import { back } from './base';
export const createSchool = (school) => ({
    type: SCHOOL_CREATE,
    school
});
export const createAdmin = (admin) => ({
    type: SCHOOL_ADD_ADMIN,
    admin
});
export const addTeacher = (email) => ({
    type: SCHOOL_ADD_TEACHER,
    email
});
export const removeTeacher = (id) => (dispatch, getState) => {
    dispatch({
        type: CALL_STARTED
    });
    deleteTeacher(id).then(() => {
        try {
            const email = getState().teacher.teachers.find((q) => q.id === id).email;
            dispatch({
                type: SCHOOL_REMOVE_TEACHER,
                email: email
            });
            dispatch(reCacheTeachers(getState().login.schoolId));
        }
        catch (p) {
            console.log(p);
        }
    }).catch((error) => {
        dispatch({
            type: CALL_FAILED, error
        });
    });
};
export const addHouse = (house) => ({
    type: SCHOOL_ADD_HOUSE,
    house
});
export const removeHouse = (name) => ({
    type: SCHOOL_REMOVE_HOUSE,
    name
});
export const submit = () => (dispatch, getState) => {
    dispatch({
        type: CALL_STARTED
    });
    postSchool(getState().schoolSignUp.school)
        .then((p) => {
        postAdmin(p, getState().schoolSignUp.admin, true).then(() => {
            dispatch({
                type: CALL_DONE,
                message: 'Your school has been signed up.You will recieve an email from our admin soon'
            });
        })
            .catch((error) => {
            dispatch({
                type: CALL_FAILED, error
            });
        });
    }).catch((error) => dispatch({
        type: CALL_FAILED, error
    }));
};
export const createTeacher = (values) => (dispatch, getState) => {
    dispatch({
        type: CALL_STARTED
    });
    const id = getState().login.schoolId;
    postAdmin({ id }, values, false).then(() => {
        dispatch({
            type: CALL_DONE
        });
        dispatch(reCacheTeachers(id));
        dispatch(back());
    })
        .catch((error) => {
        dispatch({
            type: CALL_FAILED, error
        });
    });
};
//# sourceMappingURL=school.js.map