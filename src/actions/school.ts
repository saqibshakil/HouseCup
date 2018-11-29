import { createSchool as postSchool, createAdmin as postAdmin } from '../api/school'
import { SCHOOL_ADD_ADMIN, SCHOOL_CREATE, SCHOOL_REMOVE_TEACHER, SCHOOL_ADD_TEACHER, SCHOOL_ADD_HOUSE, SCHOOL_REMOVE_HOUSE, SCHOOL_POST_STARTED, SCHOOL_POSTED, SCHOOL_POST_FAILED } from '../contants/schoolSignUp';

export const createSchool = (school: any) =>
    ({
        type: SCHOOL_CREATE,
        school
    })

export const createAdmin = (admin: any) =>
    ({
        type: SCHOOL_ADD_ADMIN,
        admin
    })

export const addTeacher = (email: string) => ({
    type: SCHOOL_ADD_TEACHER,
    email
})

export const removeTeacher = (email: string) => ({
    type: SCHOOL_REMOVE_TEACHER,
    email
})

export const addHouse = (house: any) => ({
    type: SCHOOL_ADD_HOUSE,
    house
})


export const removeHouse = (name: any) => ({
    type: SCHOOL_REMOVE_HOUSE,
    name
})

export const submit =
    () => (dispatch: any, getState: any) => {
        dispatch({
            type: SCHOOL_POST_STARTED
        })

        postSchool(getState().schoolSignUp.school)
            .then((p: any) => {
                postAdmin(p, getState().schoolSignUp.admin).then(p => {
                    dispatch({
                        type: SCHOOL_POSTED
                    })
                })
                    .catch(() => {
                        dispatch({
                            type: SCHOOL_POST_FAILED
                        })
                    })
            }).catch(() => dispatch({
                type: SCHOOL_POST_FAILED
            }))
    }