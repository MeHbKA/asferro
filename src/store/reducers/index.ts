import { soloUserReduser } from './soloUserReducer';
import { usersReducer } from './usersReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    users: usersReducer,
    user: soloUserReduser,
});

export type RootState = ReturnType<typeof rootReducer>