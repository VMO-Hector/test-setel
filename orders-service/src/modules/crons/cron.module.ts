import { Module } from '@nestjs/common';
import { CronServices } from './cron.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  providers: [CronServices],
  imports: [OrdersModule],
  exports: [CronServices],
})
export class CronModule {}
