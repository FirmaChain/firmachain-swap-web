import { createReducer } from "@reduxjs/toolkit";
import { HANDLE_USER_ORDER } from "../types";

export interface IUserState {
  order: any;
}

const initialState: IUserState = {
  order: {},
};

export default createReducer(initialState, {
  [HANDLE_USER_ORDER]: (state: IUserState, { order }) => {
    state.order = order;
  },
});
