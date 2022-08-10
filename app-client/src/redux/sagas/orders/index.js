import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { notification } from 'antd';
import swal from 'sweetalert';
import { apiCancelOrder, apiOrders, apiVerifyOrder } from '../../../config';
import {
  CANCELLED_ORDERS,
  CREATE_ORDER,
  LIST_MYORDERS_REQUEST,
  VERIFY_ORDER,
} from '../../../constant';
import {
  cancelledOrderFailed,
  getMyOrderFailed,
  getMyOrderSuccess,
  setVisibleModalVerify,
} from '../../actions/orders';

const openNotification = () => {
  notification.success({
    message: `Order success, Pls check Email!`,
  });
};

function* getMyOrders(params) {
  return yield axios.get(apiOrders, { params });
}

function* getMyOrderSaga(actions) {
  try {
    const response = yield call(getMyOrders, actions.payload);
    if (response.data) yield put(getMyOrderSuccess(response.data));
  } catch (error) {
    yield put(getMyOrderFailed());
  }
}

export function* getMyOrderRequest() {
  yield takeLatest(LIST_MYORDERS_REQUEST, getMyOrderSaga);
}

function* cancelOrders(actions) {
  try {
    const { id, email } = actions.payload;
    const { data } = yield axios.put(apiCancelOrder, { id, email });
    return data;
  } catch (error) {
    yield put(cancelledOrderFailed(error));
  }
}

export function* cancelOrdersRequest() {
  yield takeLatest(CANCELLED_ORDERS, cancelOrders);
}

function* verifyOrder(actions) {
  try {
    yield put(setVisibleModalVerify(true));
    const { id, email, code } = actions.payload;
    const { data } = yield axios.put(apiVerifyOrder, {
      id,
      email,
      code,
    });
    if (data.status !== 200 || data.status === 404) {
      swal('Verify failed!', 'You clicked the button!', 'error');
    }
    yield put(setVisibleModalVerify(false));

    return data;
  } catch (error) {
    swal('Verify failed!', 'You clicked the button!', 'error');
    yield put(setVisibleModalVerify(false));
    yield put(cancelledOrderFailed(error));
  }
}
export function* verifyOrderRequest() {
  yield takeLatest(VERIFY_ORDER, verifyOrder);
}

function* createOrder(action) {
  try {
    const { data } = yield axios.post(apiOrders, action.payload);
    const dataCart = JSON.parse(sessionStorage.getItem('cart'));
    const dataOrder = JSON.parse(action.payload.meta);
    const listIdOrder = dataOrder.map(i => i.id)
    listIdOrder.forEach(el =>{
      const removeIndex = dataCart.findIndex( item => item.id === el );
      dataCart.splice( removeIndex, 1 );    
    })
    sessionStorage.setItem('cart', JSON.stringify(dataCart))
    openNotification('topRight');
    return data;
  } catch (error) {
    swal('Create order failed!', 'You clicked the button!', 'error');
  }
}

export function* createOrderRequest() {
  yield takeLatest(CREATE_ORDER, createOrder);
}
