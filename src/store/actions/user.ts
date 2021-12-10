import { mainURL } from './../../ApiHelper';
import { UserAction, UserActionTypes } from './../../types/user';
import { Dispatch } from "redux";
import axios from 'axios';

export const fetchUserData = (userId: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER});
            const response = await axios.get(`${mainURL + userId}`);
            // console.log(response.data);
            dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload:response.data})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR, 
                payload: `Ошибка при загрузке пользователя.Сообщение ошибки:  ${e}`,
            })
        }
    }
}

export const createUser = (data:object) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER});
            const response = await axios.post(
                `${mainURL}`,
                data
            );
            console.log(response.data);
            dispatch({type: UserActionTypes.CREATE_OR_EDIT_USER_SUCCESS})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR, 
                payload: `Ошибка при загрузке пользователя.Сообщение ошибки:  ${e}`,
            })
        }
    }
}

export const editUserData = (userId: string, data:object) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER});
            const response = await axios.put(
                `${mainURL + userId}`,
                data
            );
            console.log(response.data);
            dispatch({type: UserActionTypes.CREATE_OR_EDIT_USER_SUCCESS})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR, 
                payload: `Ошибка при загрузке пользователя.Сообщение ошибки:  ${e}`,
            })
        }
    }
}