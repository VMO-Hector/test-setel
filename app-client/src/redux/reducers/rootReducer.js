import { combineReducers } from '@reduxjs/toolkit';
import { MyOrderReducer } from './orders';
import { productsReducer } from './products/index';

export default combineReducers({
  listProducts: productsReducer,
  myOrders: MyOrderReducer,
});
