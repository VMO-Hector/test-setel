import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, UpdateStatusDto } from './orders.dto';
import { Orders } from './orders.entity';
import { ResultOrders } from './result-update.interface';
import { UpdateResult } from 'typeorm';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiQuery({
    name: 'email',
    required: false,
    example: 'test@gmail.com',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    example: 'pending',
    type: String,
  })
  async getAllOrder(@Query('status') status: string): Promise<Orders[]> {
    return this.orderService.getAllOrders(status);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getOrderDetail(@Param('id', ParseIntPipe) id: number): Promise<Orders> {
    return this.orderService.getOrderDetail(id);
  }

  @Post()
  async createOrder(
    @Body() creatOrderInput: CreateOrderDto,
  ): Promise<ResultOrders> {
    return this.orderService.createOrder(creatOrderInput);
  }

  @Put('verify')
  async updateStatusOrderByCode(
    @Body() valueVerifyInput: UpdateStatusDto,
  ): Promise<ResultOrders> {
    return this.orderService.updateStatusOrderWithCode(valueVerifyInput);
  }

  @Put('cancel')
  async cancelOrder(
    @Body() paramsCancelOrderInput: UpdateStatusDto,
  ): Promise<UpdateResult> {
    return this.orderService.cancelOrder(paramsCancelOrderInput);
  }
}
