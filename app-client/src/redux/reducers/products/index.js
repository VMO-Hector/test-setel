import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../../actions/products/index';

const initalState = {
  products: [],
  productDetail: {},
  error: false,
};

export const productsReducer = createReducer(initalState, {
  [actions.getProductSuccess]: (state, action) => ({
    ...state,
    products: action.payload,
  }),

  [actions.getProductFailed]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [actions.getProductDetailSuccess]: (state, action) => ({
    ...state,
    productDetail: action.payload,
  }),

  [actions.getProductDetailFailed]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
});
