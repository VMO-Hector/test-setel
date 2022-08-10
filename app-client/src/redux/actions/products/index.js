import { createAction } from '@reduxjs/toolkit';
import {
  LIST_PRODUCT_REQUEST,
  LIST_PRODUCT_SUCCESS,
  LIST_PRODUCT_FAILED,
  LIST_PRODUCT_DETAIL_REQUEST,
  LIST_PRODUCT_DETAIL_SUCCESS,
  LIST_PRODUCT_DETAIL_FAILED,
} from '../../../constant/index';

export const getProduct = createAction(LIST_PRODUCT_REQUEST);
export const getProductSuccess = createAction(LIST_PRODUCT_SUCCESS);
export const getProductFailed = createAction(LIST_PRODUCT_FAILED);

export const getProductDetail = createAction(LIST_PRODUCT_DETAIL_REQUEST);
export const getProductDetailSuccess = createAction(
  LIST_PRODUCT_DETAIL_SUCCESS,
);
export const getProductDetailFailed = createAction(LIST_PRODUCT_DETAIL_FAILED);
