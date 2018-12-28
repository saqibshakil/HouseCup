import { del, create } from '../api/house';
import { SCHOOL_POST_STARTED, SCHOOL_REMOVE_HOUSE, SCHOOL_POST_FAILED, SCHOOL_POSTED } from '../contants/schoolSignUp';
import { reCacheHouses } from './login';

export const remove = (id: string) => (dispatch: any, getState: any) => {
    dispatch({
        type: SCHOOL_POST_STARTED
    })

    del(id).then(() => {
        try {
            dispatch({
                type: SCHOOL_REMOVE_HOUSE,
                id
            })
            dispatch(reCacheHouses(getState().login.schoolId))
            dispatch({
                type: SCHOOL_POSTED
            })
        } catch (p) {
            console.log(p)
        }
    }).catch((error) => {
        dispatch({
            type: SCHOOL_POST_FAILED, error
        })
    })
}

export const createHouse = (values: any) => (dispatch: any, getState: any) => {
    dispatch({
        type: SCHOOL_POST_STARTED
    })
    const id = getState().login.schoolId
    create({ id }, values).then(() => {
        dispatch({
            type: SCHOOL_POSTED
        })

        dispatch(reCacheHouses(id))
    })
        .catch((error: string) => {
            dispatch({
                type: SCHOOL_POST_FAILED, error
            })
        })
}