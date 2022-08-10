import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionDto } from './transactions.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
@ApiTags('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post()
  async createPayment(
    @Body() creatPaymentInput: TransactionDto,
  ): Promise<string> {
    return this.paymentService.createPayment(creatPaymentInput);
  }
}
