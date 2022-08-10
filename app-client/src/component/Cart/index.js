import React, { useEffect, useState } from 'react';
import { Headers } from '../Headers';
import { Card, Checkbox, InputNumber, Button, Row, Col } from 'antd';
import { FormInfo } from '../Form/FormInfo';
import './index.css'

export const Cart = () => {
  const [dataCart, setDataCart] = useState(JSON.parse(sessionStorage.getItem('cart')))
  const [dataChecked, setDataChecked] = useState([])
  const [checkAll, setCheckAll] = useState(false)
  const [totalPrice, setTotal] = useState(0)

  useEffect(() => {
    updateTotalPrice()
  }, [dataChecked])

  const updateTotalPrice = () => {
    let total = 0;
    dataChecked.forEach(data => {
      total += data.totalPrice
    })
    setTotal(total)
  }

  const onChecked = (value, e) => {
    if (e) {
      setDataChecked([...dataChecked, value])
    } else {
      const newData = dataChecked.filter(data => data.id !== value.id)
      setDataChecked(newData)
    }
    setCheckAll(false)
  }

  const getDataNewCart = () => {
    setDataCart(JSON.parse(sessionStorage.getItem('cart')))
  }

  const deleteProductInCart = (id) => {
    const dataCheckedAfter = dataChecked.filter(i => i.id !== id)
    setDataChecked(dataCheckedAfter)
    const result = dataCart.filter(i => (
      i.id !== id
    ))
    setDataCart(result)
    sessionStorage.setItem('cart', JSON.stringify(result))
  }

  const changeAmount = (value, e) => {
    value.amount = e;
    value.totalPrice = e * value.price
    dataCart.forEach((el, i) => {
      if (el.id === value.id) {
        dataCart[i] = value
      }
    })
    dataChecked.forEach((el, i) => {
      if (el.id === value.id) {
        dataChecked[i] = value
      }
    })
    sessionStorage.setItem('cart', JSON.stringify(dataCart))
    getDataNewCart()
    updateTotalPrice()
  }

  const checkedAll = (e) => {
    setDataChecked(e.target.checked ? dataCart : []);
    setCheckAll(e.target.checked)
  }

  const renderChecked = (product) =>{
    if(!checkAll){
      return <Checkbox className="select-product" onChange={(e) => onChecked(product, e.target.checked)} />
    }
    return <Checkbox className="select-product" disabled />
  }

  return (
    <div className="list-cart">
      <Headers params="cart" />
      {dataCart?.length ?
        <Row className="select-all">
          <Col span={16} offset={4}>
            <Checkbox className="select-product" onChange={checkedAll} checked={checkAll} />Select All
            <span className="price">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(totalPrice) }$</span>
          </Col>
        </Row>:''}
      {dataCart?.length ? dataCart.map(data => (
        <Row key={data.id}>
          <Col span={18} offset={3}>
            <Card type="inner" title={data.name} className="view-cart">
              {renderChecked(data)}
              <img alt="product" src={`${data.images}`} width={150} height={150} />
              <InputNumber min={1} defaultValue={data.amount ? data.amount : 1} onChange={(event) => { changeAmount(data, event) }} />
              <span className="price"> {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(data.price)}</span>
              <div className="right-action">
                <span className="price"> Amount: { new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(data.totalPrice) }</span>
                <Button className="btn-delete" type="primary" danger onClick={() => deleteProductInCart(data.id)} >Delete</Button>
              </div>
            </Card>
          </Col>
        </Row>
      )) : ''}
      {dataChecked.length ? <FormInfo dataChecked={dataChecked} /> : ''}
    </div>
  );
}
