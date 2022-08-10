import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { CreateOrderDto, UpdateStatusDto } from './orders.dto';
import { MailService } from '../../shares/Mailer/sendEmail';
import { OrderStatus, PaymentStatus } from '../../shares/enums';
import { ResultOrders } from './result-update.interface';
import { ExceptionMessages } from '../../shares/enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private order: Repository<Orders>,
    private mailService: MailService,
  ) {}

  async getAllOrders(status: string): Promise<Orders[]> {
    try {
      const query = {};
      if (status) query['where'] = { status };
      query['order'] = { id: 'DESC' };
      return this.order.find(query);
    } catch (error) {
      throw new BadRequestException(ExceptionMessages.ORDER_NOT_FOUND);
    }
  }

  async getOrderDetail(id: number): Promise<Orders> {
    try {
      return this.order.findOne({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(ExceptionMessages.ORDER_NOT_FOUND);
    }
  }

  async createOrder(creatOrderInput: CreateOrderDto): Promise<ResultOrders> {
    try {
      const { meta, email } = creatOrderInput;
      const isProduct = JSON.parse(meta);
      let total = 0;
      for (const property of isProduct) {
        total += property.price * property.amount;
      }
      creatOrderInput['price'] = total;
      const code: string = Math.random().toString(36).substring(7);
      creatOrderInput['code'] = code;
      await this.mailService.sendCodeInEmail(code, email);
      await this.order.save(creatOrderInput);
      return {
        messages: 'Create order success, Pls check email!',
        status: 200,
      };
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }

  async updateStatusOrderWithCode(
    valueVerifyInput: UpdateStatusDto,
  ): Promise<ResultOrders> {
    try {
      const { code, id, email } = valueVerifyInput;
      const order = await this.order.findOne({
        where: {
          id,
          code,
          email,
        },
      });
      if (order?.code === code && order?.status === OrderStatus.CREATED) {
        const { address, phone, price } = order;
        const valuesPayments = {
          email,
          phone,
          id_order: id,
          address,
          price,
        };
        const resultPayment = PaymentStatus.CONFIRMED;
        if (String(resultPayment) === PaymentStatus.CONFIRMED) {
          await this.order.update({ id }, { code: '' });
          await this.order.update(
            { id },
            {
              status: OrderStatus.CONFIRMED,
            },
          );
          return {
            messages: 'Verify code success!',
            status: 200,
          };
        } else {
          await this.order.update(
            { id },
            { code: '', status: OrderStatus.CANCELLED },
          );
        }
      }
      return {
        messages: 'Verify code failed!',
        status: 404,
      };
    } catch (error) {
      throw new BadRequestException(ExceptionMessages.PAYMENTS_SERVICE_ERROR);
    }
  }

  async updateStatusOrder(): Promise<UpdateResult> {
    try {
      return this.order
        .createQueryBuilder()
        .update(Orders)
        .set({ status: OrderStatus.DELIVERED })
        .where('status = :status', { status: OrderStatus.CONFIRMED })
        .execute();
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }

  async cancelOrder(
    paramsCancelOrderInput: UpdateStatusDto,
  ): Promise<UpdateResult> {
    try {
      const { email, id } = paramsCancelOrderInput;
      const order = await this.order.findOne({
        where: {
          id,
          email,
        },
      });
      if (
        order.status === OrderStatus.CREATED ||
        order.status === OrderStatus.CONFIRMED
      )
        return this.order.update(
          { id: id },
          {
            status: OrderStatus.CANCELLED,
          },
        );
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }
}
