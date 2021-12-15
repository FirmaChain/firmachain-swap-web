import { bindActionCreators } from "redux";

import * as userAction from "./actions/userAction";

import store from "./store";

const { dispatch } = store;

export const userActions = bindActionCreators(userAction, dispatch);
