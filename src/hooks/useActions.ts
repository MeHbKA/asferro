import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UsersActionCreators from '../store/actions/users';
import * as UserActionCreators from '../store/actions/user'

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(UsersActionCreators, dispatch)
}

export const useUserActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(UserActionCreators, dispatch)
}