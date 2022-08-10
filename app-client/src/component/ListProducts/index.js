import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row, Button, notification, Tooltip } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';
import { getProduct } from '../../redux/actions/products';
import { apiProducts } from '../../config';
import { Headers } from '../Headers';
import axios from 'axios';
import './index.css'

export const ListProducts = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.listProducts);
  const [listProducts, setProducts] = useState([]);
  const [isAddToCart, setStatusAdd] = useState(false);

  useEffect(() => {
    genProduct();
  }, [dispatch, isAddToCart])

  useEffect(() =>{
    setProducts(products)
  },[products])

  const genProduct = async () => {
    await axios.post(apiProducts)
    dispatch(getProduct());
  }

  const openNotification = () => {
    notification.success({
      message: `Add product to cart success!`,
    });
  };

  const addToCart = (values) => {
    setStatusAdd(!isAddToCart)
    const dataAddToCart = {
      ...values,
      amount: 1,
      totalPrice: values.price
    }
    const valuesCartParse = JSON.parse(sessionStorage.getItem('cart'))
    valuesCartParse.push(dataAddToCart)
    openNotification()
    sessionStorage.setItem('cart', JSON.stringify(valuesCartParse))
  }

  const renderButtonAddToCart = product =>{
    const dataCart = JSON.parse(sessionStorage.getItem('cart'))
    const listId = dataCart.map(i => i.id)
    const isAdd = listId.includes(product.id)
    if(!isAdd){
      return <Button type="primary" onClick={() => addToCart(product)}>Add to cart</Button>
    }
    return(
      <Tooltip placement="topLeft" title={'The product already exists in the cart'}>
        <Button type="primary" disabled>Add to cart</Button>
      </Tooltip>);
  }

  return (
    <div className="site-card-wrapper">
      <Headers params="home" />
      <Row justify="center" align="top" className="chooseOption">
        {listProducts.length && !error
          ? products.map((product) => (
            <Col span={4} key={product.id}>
              <Card
                honorable
                style={{ width: 240 }}
                cover={<img alt="example" src={`${product.images}`} />}
              >
                <Meta title={product.name} />
                <Meta title={new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(product.price)} />
                <div >
                 {renderButtonAddToCart(product)}
                  <p>
                    <Link to={`product/${product.id}`}>More</Link>
                  </p>
                </div>
              </Card>
            </Col>
          ))
          : ''}
      </Row>
    </div>
  );
}