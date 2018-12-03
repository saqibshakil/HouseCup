import { createSchool as postSchool, createAdmin as postAdmin } from '../api/school';
import { SCHOOL_ADD_ADMIN, SCHOOL_CREATE, SCHOOL_REMOVE_TEACHER, SCHOOL_ADD_TEACHER, SCHOOL_ADD_HOUSE, SCHOOL_REMOVE_HOUSE, SCHOOL_POST_STARTED, SCHOOL_POSTED, SCHOOL_POST_FAILED } from '../contants/schoolSignUp';
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
export const removeTeacher = (email) => ({
    type: SCHOOL_REMOVE_TEACHER,
    email
});
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
        type: SCHOOL_POST_STARTED
    });
    postSchool(getState().schoolSignUp.school)
        .then((p) => {
        postAdmin(p, getState().schoolSignUp.admin).then(p => {
            dispatch({
                type: SCHOOL_POSTED
            });
        })
            .catch((error) => {
            dispatch({
                type: SCHOOL_POST_FAILED, error
            });
        });
    }).catch((error) => dispatch({
        type: SCHOOL_POST_FAILED, error
    }));
};
//# sourceMappingURL=school.js.map