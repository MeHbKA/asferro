import { UserActionTypes, UserAction, SoloUserState } from '../../types/user';


const initialState : SoloUserState = {
    user: {
        id: null,
        name: null,
        surname: null,
        dateOfBirthday: null,
        phone: null,
        email: null,
        create: null,
    },
    loading: false,
    error: null,
}


export const soloUserReduser = (state = initialState, action:UserAction) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER:
            return {loading: true, error: null, user: {}}
        case UserActionTypes.FETCH_USER_SUCCESS:
            return {loading: false, error: null, user: action.payload}
        case UserActionTypes.CREATE_OR_EDIT_USER_SUCCESS:
            return {loading: false, error: null, user: {}}
        case UserActionTypes.FETCH_USER_ERROR:
            return {loading: false, error: action.payload, user: {}}
        default: 
            return state
    }
}