import { createReducer } from "@reduxjs/toolkit";
import { HANDLE_USER_ORDER, HANDLE_METAMASK } from "../types";

export interface IUserState {
  order: any;
  initMetamask: boolean;
}

const initialState: IUserState = {
  order: {},
  initMetamask: false,
};

export default createReducer(initialState, {
  [HANDLE_USER_ORDER]: (state: IUserState, { order }) => {
    state.order = {
      ...state.order,
      ...order,
    };
  },
  [HANDLE_METAMASK]: (state: IUserState, { initMetamask }) => {
    state.initMetamask = initMetamask;
  },
});
