import { Dispatch } from 'react';
import { Action } from 'redux';

export const SCHOOL_CREATE = 'CREATE_SCHOOL'
export const SCHOOL_CHANGE = 'SCHOOL_CHANGE'
export const SCHOOL_ADD_TEACHER = 'SCHOOL_ADD_TEACHER'
export const SCHOOL_ADD_HOUSE = 'SCHOOL_ADD_HOUSE'

export const createSchool = () =>
    (dispatch: Dispatch<Action>, getState: () => any): void => {
        const a = 0
    }

export const onChange = (val: any, prop: string) => ({
    type: SCHOOL_CHANGE,
    action: {
        val,
        prop
    }
})

export const addTeacher = () => ({
    type: SCHOOL_ADD_TEACHER
})