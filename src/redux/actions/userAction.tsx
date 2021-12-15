import { HANDLE_USER_ORDER } from "../types";

export const handleUserOrder = (order: any) => ({ type: HANDLE_USER_ORDER, order });
