import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { apiProducts } from '../../../config';
import {
  LIST_PRODUCT_DETAIL_REQUEST,
  LIST_PRODUCT_REQUEST,
} from '../../../constant';
import {
  getProductDetailFailed,
  getProductDetailSuccess,
  getProductFailed,
  getProductSuccess,
} from '../../actions/products';

function* getProducts() {
  try {
    const products = yield axios.get(apiProducts);
    yield put(getProductSuccess(products.data));
  } catch (error) {
    yield put(getProductFailed());
  }
}

export function* getProductsRequest() {
  yield takeLatest(LIST_PRODUCT_REQUEST, getProducts);
}

function* getProductDetail(action) {
  try {
    const product = yield axios.get(`${apiProducts}/${action.payload}`);
    yield put(getProductDetailSuccess(product.data));
  } catch (error) {
    yield put(getProductDetailFailed());
  }
}

export function* getProductDetailRequest() {
  yield takeLatest(LIST_PRODUCT_DETAIL_REQUEST, getProductDetail);
}
