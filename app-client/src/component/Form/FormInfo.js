import { Button, Input, Form, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../redux/actions/orders';
import swal from 'sweetalert';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: '${label} is not a valid email!',
    // eslint-disable-next-line no-template-curly-in-string
    number: '${label} is not a valid number!',
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    range: '${label} must be between ${min} and ${max}',
  },
};
export const FormInfo = ({ dataChecked }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    let totalPrice = 0;
    const detailOrder = values.user;
    dataChecked.forEach(value => {
      totalPrice += value.totalPrice
    })
    swal({
      title: "Are you sure?",
      text: `Agree to order with the total amount: ${totalPrice}$`,
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          detailOrder['meta'] = JSON.stringify(dataChecked);
          dispatch(createOrder(detailOrder));
          navigate('/my-order');
        }
      });
  };

  return (
    <Row style={{marginTop:'20px'}}>
      <Col span={12} offset={4}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['user', 'phone']}
            label="Phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'address']}
            label="Address"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Order
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
