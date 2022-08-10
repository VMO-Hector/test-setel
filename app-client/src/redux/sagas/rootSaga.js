import { fork } from 'redux-saga/effects';
import {
  cancelOrdersRequest,
  createOrderRequest,
  getMyOrderRequest,
  verifyOrderRequest,
} from './orders';
import { getProductDetailRequest, getProductsRequest } from './products';

export default function* rootSaga() {
  yield fork(getProductsRequest);
  yield fork(getProductDetailRequest);
  yield fork(getMyOrderRequest);
  yield fork(cancelOrdersRequest);
  yield fork(verifyOrderRequest);
  yield fork(createOrderRequest);
}
