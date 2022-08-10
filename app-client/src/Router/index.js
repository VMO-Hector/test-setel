import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cart } from '../component/Cart';
import DetailsProduct from '../component/DetailsProduct';
import {ListProducts} from '../component/ListProducts';
import { MyOrder } from '../component/MyOrders';
export const Routers =() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ListProducts />} />
        <Route exact path="/product/:id" element={<DetailsProduct />} />
        <Route exact path="/my-order" element={<MyOrder />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}