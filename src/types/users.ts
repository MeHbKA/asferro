export enum UsersActionTypes {
    FETCH_USERS = "FETCH_USERS",
    FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
    DELETE_USER_DATA = "DELETE_USER_DATA",
    FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
}


export interface UsersState {
    users: any[];
    loading: boolean;
    error: null | string;
}

interface FetchUsersAction {
    type: UsersActionTypes.FETCH_USERS;
}

interface DeleteUserDataAction {
    type: UsersActionTypes.DELETE_USER_DATA;
}

interface FetchUsersSuccessAction {
    type: UsersActionTypes.FETCH_USERS_SUCCESS;
    payload: any[];
}

interface FetchUserErrorAction {
    type: UsersActionTypes.FETCH_USERS_ERROR;
    payload: string;
}



export type UsersAction = FetchUsersAction | FetchUsersSuccessAction | FetchUserErrorAction | DeleteUserDataAction;
