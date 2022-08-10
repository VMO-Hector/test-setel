import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../../actions/orders/index';

const initalState = {
  orders: [],
  error: false,
  isOpenVerify: false,
};

export const MyOrderReducer = createReducer(initalState, {
  [actions.getMyOrderSuccess]: (state, action) => ({
    ...state,
    orders: action.payload,
  }),

  [actions.getMyOrderFailed]: (state, action) => ({
    ...state,
    error: action.payload,
  }),

  [actions.cancelledOrderFailed]: (state, action) => ({
    ...state,
    error: action.payload,
  }),

  [actions.setVisibleModalVerify]: (state, action) => ({
    ...state,
    isOpenVerify: action.payload,
  }),
});
