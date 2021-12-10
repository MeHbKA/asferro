import { UsersActionTypes, UsersAction, UsersState } from '../../types/users';


const initialState : UsersState = {
    users: [],
    loading: false,
    error: null
}


export const usersReducer = (state = initialState, action:UsersAction) => {
    switch (action.type) {
        case UsersActionTypes.FETCH_USERS:
            return {loading: true, error: null, user: {}, users:[]}
        case UsersActionTypes.FETCH_USERS_SUCCESS:
            return {loading: false, error: null, user: {}, users: action.payload}
        case UsersActionTypes.DELETE_USER_DATA:
            return {loading: false, error: null, user: {}, users:[]}
        case UsersActionTypes.FETCH_USERS_ERROR:
            return {loading: false, error: action.payload, users:[]}
        default: 
            return state
    }
}