import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { Routers } from './Router';
import store from './store';
import { useEffect } from 'react';
export const App =() => {
  useEffect(() =>{
    const valuesOldCart = sessionStorage.getItem('cart')
    if(!valuesOldCart) sessionStorage.setItem('cart', JSON.stringify([]))
  })
  
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}
