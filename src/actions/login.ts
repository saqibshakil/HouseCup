import {
    TEACHER_LOGIN, TEACHER_LOGGEDIN, TEACHER_LOGIN_FAILED, CACHE_HOUSES, CACHE_REASONS, CACHE_TEACHERS, RENAVIGATE
} from '../contants/login'

import * as api from '../api/login'
import { Toast } from 'native-base'

export const login = (email: string, password: string) =>
    (dispatch: any) => {
        dispatch({ type: TEACHER_LOGIN, email, password })
        api.login(email, password)
            .then((success: any) => {
                dispatch(cacheData(success))
            })
            .catch((p) => {
                Toast.show({
                    text: p || 'Email or password do not match',
                    position: 'bottom',
                    type: 'danger'
                })
                dispatch({ type: TEACHER_LOGIN_FAILED, p })
            })
    }

export const cacheData = (success: any) =>
    (dispatch: any) => {
        api.cacheSchoolInfo(success.schoolId).then(({ houses, reasons, teachers }) => {
            dispatch({
                type: CACHE_HOUSES,
                houses
            })
            dispatch({
                type: CACHE_REASONS,
                reasons
            })
            dispatch({
                type: CACHE_TEACHERS,
                teachers
            })
            dispatch({ type: TEACHER_LOGGEDIN, ...success })
            dispatch(reNavigate())
        })
    }
export const reCacheTeachers = (schoolId: string) =>
    (dispatch: any) => {
        console.log('recahce')
        api.getTeacher(schoolId).then(teachers => {
            dispatch({
                type: CACHE_TEACHERS,
                teachers
            })
        })
    }

    export const reCacheHouses = (schoolId: string) =>
    (dispatch: any) => {
        api.getHouses(schoolId).then(houses => {
            dispatch({
                type: CACHE_HOUSES,
                houses
            })
        })
    }

export const reNavigate = () =>
    (dispatch: any, getState: any) => {
        const state = getState()
        const teacher = state.teacher.teachers.filter((p: any) => p.id === state.login.teacherId)[0]
        if (teacher.isAdmin)
            dispatch({
                type: RENAVIGATE,
                to: 'Admin'
            })
        else
            dispatch({
                type: RENAVIGATE,
                to: 'Teacher'
            })
    }