import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOrder } from '../../redux/actions/orders';

export const VerifyCode = ({ isModalVisible, setIsModalVisible, idAndEmail }) => {
  const [code, setCode] = useState('');
  const { id, email } = idAndEmail;

  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(verifyOrder({ id, email, code }));
    setCode('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCode('');
  };

  const handOnchange = (e) => {
    setCode(e.target.value);
  };

  return (
    <Modal
      destroyOnClose={true}
      title="Verify code orders"
      visible={isModalVisible}
      value={code}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input placeholder="Code" onChange={handOnchange} />
    </Modal>
  );
}
