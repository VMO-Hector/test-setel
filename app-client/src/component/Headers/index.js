import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons'
import './index.css'

export const Headers = ({ params }) => {
  const [current, setCurrent] = useState(params);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="menuNav">
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="my-order">
        <Link to="/my-order">My Order</Link>
      </Menu.Item>
      <Menu.Item key="cart" className="cart-list">
        <Link to="/cart"><ShoppingCartOutlined /> Cart</Link>
      </Menu.Item>
    </Menu>
  );
}
