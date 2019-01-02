import { del, create } from '../api/house';
import { CALL_STARTED, SCHOOL_REMOVE_HOUSE, CALL_FAILED, CALL_DONE } from '../contants/schoolSignUp';
import { reCacheHouses } from './login';
export const remove = (id) => (dispatch, getState) => {
    dispatch({
        type: CALL_STARTED
    });
    del(id).then(() => {
        try {
            dispatch({
                type: SCHOOL_REMOVE_HOUSE,
                id
            });
            dispatch(reCacheHouses(getState().login.schoolId));
            dispatch({
                type: CALL_DONE
            });
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
export const createHouse = (values) => (dispatch, getState) => {
    dispatch({
        type: CALL_STARTED
    });
    const id = getState().login.schoolId;
    create({ id }, values).then(() => {
        dispatch({
            type: CALL_DONE
        });
        dispatch(reCacheHouses(id));
    })
        .catch((error) => {
        dispatch({
            type: CALL_FAILED, error
        });
    });
};
//# sourceMappingURL=house.js.map