import { HANDLE_USER_ORDER, HANDLE_METAMASK } from "../types";

export const handleUserOrder = (order: any) => ({ type: HANDLE_USER_ORDER, order });
export const handleMetamask = (initMetamask: any) => ({ type: HANDLE_METAMASK, initMetamask });
