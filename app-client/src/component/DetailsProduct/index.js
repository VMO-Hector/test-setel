import { Card, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductDetail } from '../../redux/actions/products';
import { useParams } from 'react-router';
import { Headers } from '../Headers';


export const DetailsProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { productDetail, error } = useSelector((state) => state.listProducts);

  useEffect(() => {
    dispatch(getProductDetail(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="site-card-wrapper">
      <Headers params="home" />
      <Row justify="center" align="top">
        <Col span={4}>
          {!error && (
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={`${productDetail.images}`} />}
            ></Card>
          )}
        </Col>
        <Col span={4}>
          <p>Name: {!error && productDetail.name}</p>
          <p>Price: {!error && new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(productDetail.price) }</p>
        </Col>
      </Row>
    </div>
  );
}

export default DetailsProduct;
