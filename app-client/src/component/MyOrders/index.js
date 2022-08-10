import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Space, Button, Select } from 'antd';
import swal from 'sweetalert';
import {
  getMyOrder,
  cancelledOrder,
  setVisibleModalVerify,
} from '../../redux/actions/orders';
import {Headers} from '../Headers';
import {
  CANCELLED,
  CREATED,
  CONFIRMED,
  DELIVERED,
} from '../../constant/status';
import {VerifyCode} from './VerifyCode';
import './index.css'

const { Option } = Select;

export const MyOrder =() => {
  const dispatch = useDispatch();
  const [dataOrders, setData] = useState([]);
  const { orders, isOpenVerify } = useSelector((state) => state.myOrders);
  const [status, setStatus] = useState('all');
  const [idAndEmailOrder, setIdAndEmail] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getMyOrder());
    }, 10000);
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    if (status === 'all') {
      dispatch(getMyOrder());
    } else {
      dispatch(getMyOrder({ status }));
    }
  }, [dispatch, status, isOpenVerify]);

  useEffect(() => {
    if (orders) {
      setData(orders);
    }
  }, [orders]);

  const handleChange = (value) => {
    setStatus(value);
  };

  const cancelOrder = (id, email) => {
    swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(cancelledOrder({ id, email }));
        setStatus(CANCELLED);
      }
    });
  };

  const openModal = (value) => {
    dispatch(setVisibleModalVerify(value));
  };

  const openModalAndSendData = (value) => {
    openModal(true);
    setIdAndEmail(value);
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(price)
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = status === CANCELLED ? 'red' : 'green';
        if (status === CREATED) {
          color = 'geekblue';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {record.status === CREATED || record.status === CONFIRMED ? (
            <Button
              type="primary"
              onClick={() => cancelOrder(record.id, record.email)}
            >
              Cancel
            </Button>
          ) : (
            ''
          )}
          {record.status === CREATED ? (
            <Button
              type="primary"
              onClick={() =>
                openModalAndSendData({ id: record.id, email: record.email })
              }
            >
              Verify
            </Button>
          ) : (
            ''
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="my-orders">
      <Headers params="my-order" />
      <Select className="select-status" defaultValue="all" value={status} onChange={handleChange}>
        <Option value={'all'}>All</Option>
        <Option value={CREATED}>{CREATED}</Option>
        <Option value={CONFIRMED}>{CONFIRMED}</Option>
        <Option value={DELIVERED}>{DELIVERED}</Option>
        <Option value={CANCELLED}>{CANCELLED}</Option>
      </Select>
      <VerifyCode
        isModalVisible={isOpenVerify}
        setIsModalVisible={openModal}
        idAndEmail={idAndEmailOrder}
      />
      <Table columns={columns} dataSource={dataOrders} />
    </div>
  );
}
