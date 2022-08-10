import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './modules/crons/cron.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [ProductsModule, OrdersModule, CronModule, ScheduleModule.forRoot()],
  exports: [ProductsModule, OrdersModule, CronModule],
})
export class CoreModule {}
