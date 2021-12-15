import { combineReducers } from "redux";
import userReducer, { IUserState } from "./userReducer";

export interface rootState {
  user: IUserState;
}

export default combineReducers({
  user: userReducer,
});
