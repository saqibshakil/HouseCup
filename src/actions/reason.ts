import { del, create } from '../api/reason';
import { CALL_STARTED, SCHOOL_REMOVE_REASON, CALL_FAILED, CALL_DONE } from '../contants/schoolSignUp';
import { reCacheReasons } from './login';

export const remove = (id: string) => (dispatch: any, getState: any) => {
    dispatch({
        type: CALL_STARTED
    })

    del(id).then(() => {
        try {
            dispatch({
                type: SCHOOL_REMOVE_REASON,
                id
            })
            dispatch(reCacheReasons(getState().login.schoolId))
            dispatch({
                type: CALL_DONE
            })
        } catch (p) {
            console.log(p)
        }
    }).catch((error) => {
        dispatch({
            type: CALL_FAILED, error
        })
    })
}

export const createReason = (values: any) => (dispatch: any, getState: any) => {
    dispatch({
        type: CALL_STARTED
    })
    const id = getState().login.schoolId
    create({ id }, values).then(() => {
        dispatch({
            type: CALL_DONE
        })

        dispatch(reCacheReasons(id))
    })
        .catch((error: string) => {
            dispatch({
                type: CALL_FAILED, error
            })
        })
}