import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class CronServices {
  constructor(private readonly ordersService: OrdersService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    await this.ordersService.updateStatusOrder();
  }
}
