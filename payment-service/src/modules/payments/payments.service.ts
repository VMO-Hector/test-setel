import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDto } from './transactions.dto';
import { Transactions } from './transactions.entity';
import { PaymentStatus } from '../../shares';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactions: Repository<Transactions>,
  ) {}

  async createPayment(creatPaymentInput: TransactionDto): Promise<string> {
    try {
      const status = [PaymentStatus.CONFIRMED, PaymentStatus.DECLINED, PaymentStatus.CONFIRMED];
      const result = status[Math.floor(Math.random() * status.length)];
      creatPaymentInput['status'] = result;
      this.transactions.save(creatPaymentInput);
      return result;
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }
}
