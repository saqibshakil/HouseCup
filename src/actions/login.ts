import {
    TEACHER_LOGIN, TEACHER_LOGGEDIN, TEACHER_LOGIN_FAILED, CACHE_HOUSES, CACHE_REASONS, CACHE_TEACHERS, RENAVIGATE, TEACHER_LOGGEDOUT
} from '../contants/login'

import * as api from '../api/login'
import { Toast } from 'native-base'
import { FETCH_HOUSE_POINTS } from '../contants/home';
import { CALL_STARTED, CALL_DONE, CALL_FAILED } from '../contants/schoolSignUp';
import { setLoginKey, clearLoginKey, gotoLogin } from './base';
import { SecureStore } from 'expo';

export const cacheData = (success: any) =>
    (dispatch: any) => {
        api.cacheSchoolInfo(success.schoolId).then(({ houses, reasons, teachers, points }) => {
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
            dispatch({
                type: FETCH_HOUSE_POINTS,
                points
            })
            dispatch({ type: TEACHER_LOGGEDIN, ...success })
            dispatch(reNavigate())
            setLoginKey(success.loginHash)
        })
    }

export const login = (email: string, password: string) =>
    (dispatch: any) => {
        dispatch({ type: TEACHER_LOGIN })
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

export const verifyLogin = (p: string) =>
    (dispatch: any) => {
        api.login('', '', p).then((success: any) => {
            dispatch(cacheData(success))
        })
            .catch((err: string) => {
                clearLoginKey()
                dispatch({ type: TEACHER_LOGIN_FAILED, error: err })
                dispatch(gotoLogin())
            })
    }

export const reCacheTeachers = (schoolId: string) =>
    (dispatch: any) => {
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

export const reCacheReasons = (schoolId: string) =>
    (dispatch: any) => {
        api.getReason(schoolId).then(reasons => {
            dispatch({
                type: CACHE_REASONS,
                reasons
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

export const logout = () =>
    (dispatch: any, getState: () => any) => {
        const { login: { userId } } = getState()
        dispatch({ type: CALL_STARTED })
        api.updateLoginHash(userId, null).then(() => {
            dispatch({ type: CALL_DONE })

            dispatch({
                type: TEACHER_LOGGEDOUT
            })
            clearLoginKey()
            dispatch({
                type: RENAVIGATE,
                to: 'PreLogin'
            })
        }).catch(() => {
            dispatch({ type: CALL_FAILED })
        })
    }

export const checkLogin =
    () =>
        (dispatch: any, getState: () => any) => {
            SecureStore.getItemAsync('loginKey').then(p => {
                if (p)
                    dispatch(verifyLogin(p))
                else {
                    if (getState().base.navigateTo === 'Loading')
                        dispatch(gotoLogin())
                }
            })
        }
