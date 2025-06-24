import { createReducer } from '@reduxjs/toolkit';

import { HANDLE_USER_ORDER } from '../types';

export interface IUserState {
    order: any;
}

const initialState: IUserState = {
    order: {}
};

const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(HANDLE_USER_ORDER, (state: IUserState, action: any) => {
        state.order = {
            ...state.order,
            ...action.order
        };
    });
});

export default userReducer;
