import { mainURL } from './../../ApiHelper';
import { UsersAction, UsersActionTypes } from './../../types/users';
import { Dispatch } from "redux";
import axios from 'axios';


export const fetchUsersData = () => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            dispatch({type: UsersActionTypes.FETCH_USERS});
            const response = await axios.get(`${mainURL}`);
            console.log(response.data);
            dispatch({type: UsersActionTypes.FETCH_USERS_SUCCESS, payload:response.data})
        } catch (e) {
            dispatch({
                type: UsersActionTypes.FETCH_USERS_ERROR, 
                payload: `Ошибка при загрузке пользователей.Сообщение ошибки:  ${e}`,
            })
        }
    }
}

export const deleteUserData = (userId:number) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            dispatch({type: UsersActionTypes.FETCH_USERS});
            
            await axios.delete(`${mainURL + userId}`);
            const deletedUser =  await axios.get(`${mainURL + userId}`);
            dispatch({type: UsersActionTypes.DELETE_USER_DATA});
            console.log(deletedUser.data);

            const response = await axios.get(`${mainURL}`);
            dispatch({type: UsersActionTypes.FETCH_USERS_SUCCESS, payload:response.data});
            
        } catch (e) {
            dispatch({
                type: UsersActionTypes.FETCH_USERS_ERROR, 
                payload: `Ошибка при загрузке пользователей.Сообщение ошибки:  ${e}`,
            })
        }
    }
}