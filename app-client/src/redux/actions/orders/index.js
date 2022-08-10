import { createAction } from '@reduxjs/toolkit';
import {
  LIST_MYORDERS_REQUEST,
  LIST_MYORDERS_SUCCESS,
  LIST_MYORDERS_FAILED,
  CANCELLED_ORDERS,
  CANCELLED_ORDERS_FAILED,
  MODAL_VERIFY_CODE_VISIBLE,
  VERIFY_ORDER,
  CREATE_ORDER,
} from '../../../constant/index';

export const getMyOrder = createAction(LIST_MYORDERS_REQUEST);
export const getMyOrderSuccess = createAction(LIST_MYORDERS_SUCCESS);
export const getMyOrderFailed = createAction(LIST_MYORDERS_FAILED);

export const cancelledOrder = createAction(CANCELLED_ORDERS);
export const cancelledOrderFailed = createAction(CANCELLED_ORDERS_FAILED);

export const createOrder = createAction(CREATE_ORDER);
export const setVisibleModalVerify = createAction(MODAL_VERIFY_CODE_VISIBLE);
export const verifyOrder = createAction(VERIFY_ORDER);
