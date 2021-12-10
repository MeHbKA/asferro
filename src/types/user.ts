export enum UserActionTypes {
    FETCH_USER = "FETCH_USER",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_ERROR = "FETCH_USER_ERROR",
    CREATE_OR_EDIT_USER_SUCCESS = "CREATE_OR_EDIT_USER_SUCCESS"
}

export interface SoloUserState {
    user: any;
    loading: boolean;
    error: null | string;
};


interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
}


interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USER_SUCCESS;
    payload: any[];
}

interface CreateUserAction {
    type: UserActionTypes.CREATE_OR_EDIT_USER_SUCCESS;
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string;
}


export type UserAction = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction | CreateUserAction;
