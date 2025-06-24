import { combineReducers } from 'redux';

import userReducer, { IUserState } from './userReducer';

export interface rootState {
    user: IUserState;
}

const reducer = combineReducers({
    user: userReducer
});

export default reducer;
