import axios from 'axios';


interface TransactionDto {
  id_order: number;
  email: string;
  phone: string;
  price: number;
  address: string;
}

export async function getResultPayment(data: TransactionDto) {
  return await axios.post('http://payment-service/api/payments:3002')
}
