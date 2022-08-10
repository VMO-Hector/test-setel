import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderStatus } from '../../shares/enums';
import { Orders } from './orders.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailService } from '../../shares/Mailer/sendEmail';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  const mockOrderRepository = {
    getAllOrders: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          id_order: 1,
          amount: 1,
          address: 'Address 1',
          phone: '123456789',
          email: 'testemail@gmail.com',
          code: 'adfnbc',
          createdAt: new Date(),
          status: OrderStatus.CONFIRMED,
        },
        {
          id: 2,
          id_order: 2,
          amount: 2,
          address: 'Address 2',
          phone: '223456789',
          email: 'testemail@gmail.com',
          code: 'adfnbc',
          createdAt: new Date(),
          status: OrderStatus.CREATED,
        },
        {
          id: 3,
          id_order: 3,
          amount: 3,
          address: 'Address 3',
          phone: '323456789',
          email: 'testemail@gmail.com',
          code: 'adfnbc',
          createdAt: new Date(),
          status: OrderStatus.CREATED,
        },
        {
          id: 4,
          id_order: 4,
          amount: 4,
          address: 'Address 4',
          phone: '423456789',
          code: 'adfnbc',
          email: 'testemail@gmail.com',
          createdAt: new Date(),
          status: OrderStatus.CREATED,
        },
      ]),
    ),
    getOrderDetails: jest.fn().mockImplementation((id = 1) =>
      Promise.resolve({
        id: 1,
        id_order: 1,
        amount: 1,
        address: 'Address 1',
        phone: '123456789',
        email: 'testemail@gmail.com',
        code: 'adfnbc',
        createdAt: new Date(),
        status: OrderStatus.CREATED,
      }),
    ),
    createOrders: jest.fn().mockImplementation((dto: CreateOrdersDto) =>
      Promise.resolve({
        messages: 'Create order success, Pls check email!',
        status: 200,
      }),
    ),
    updateStatusOrderWithCode: jest
      .fn()
      .mockImplementation((dto: UpdateStatusDto) =>
        Promise.resolve({
          messages: 'Verify code success!',
          status: 200,
        }),
      ),
    cancelOrders: jest.fn().mockImplementation((order: UpdateStatusDto) =>
      Promise.resolve({
        id: 1,
        ...order,
      }),
    ),

    updateStatusOrder: jest.fn().mockImplementation(() => ({
      update: jest.fn().mockImplementation(() => ({
        set: jest.fn().mockImplementation(() => ({
          where: jest.fn().mockImplementation(() => ({
            execute: jest
              .fn()
              .mockImplementation(() => console.log('Executing ...')),
          })),
        })),
      })),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        MailService,
        {
          provide: getRepositoryToken(Orders),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  it(`should create orders successfully`, async () => {
    const value = {
      id_order: 1,
      amount: 3,
      address: 'Address 1',
      phone: '123456789',
      email: 'testemail@gmail.com',
    };
    expect(await ordersService.createOrder(value)).toEqual([
      {
        messages: 'Create order success, Pls check email!',
        status: 200,
      },
    ]);
  });

  it(`should get all the orders no status and return them successfully`, async () => {
    expect(await ordersService.getAllOrders('')).toEqual([
      {
        id: 1,
        id_order: 1,
        amount: 1,
        address: 'Address 1',
        phone: '123456789',
        email: 'testemail@gmail.com',
        code: 'adfnbc',
        createdAt: new Date(),
        status: OrderStatus.CREATED,
      },
      {
        id: 2,
        id_order: 2,
        amount: 2,
        address: 'Address 2',
        phone: '223456789',
        email: 'testemail@gmail.com',
        code: 'adfnbc',
        createdAt: new Date(),
        status: OrderStatus.CREATED,
      },
      {
        id: 3,
        id_order: 3,
        amount: 3,
        address: 'Address 3',
        phone: '323456789',
        email: 'testemail@gmail.com',
        code: 'adfnbc',
        createdAt: new Date(),
        status: OrderStatus.CREATED,
      },
      {
        id: 4,
        id_order: 4,
        amount: 4,
        address: 'Address 4',
        phone: '423456789',
        code: 'adfnbc',
        email: 'testemail@gmail.com',
        createdAt: new Date(),
        status: OrderStatus.CREATED,
      },
    ]);
  });

  it(`should get all the orders with status and return them successfully`, async () => {
    expect(await ordersService.getAllOrders(OrderStatus.CONFIRMED)).toEqual([
      {
        id: 1,
        id_order: 1,
        amount: 1,
        address: 'Address 1',
        phone: '123456789',
        email: 'testemail@gmail.com',
        code: 'adfnbc',
        createdAt: new Date(),
        status: OrderStatus.CONFIRMED,
      },
    ]);
  });

  it(`should get the order that has ID equal 2`, async () => {
    expect(await ordersService.getOrderDetail(2)).toEqual({
      id: 2,
      id_order: 2,
      amount: 2,
      address: 'Address 2',
      phone: '223456789',
      email: 'testemail@gmail.com',
      code: 'adfnbc',
      createdAt: new Date(),
      status: OrderStatus.CREATED,
    });
  });

  it(`should update status the order that has code `, async () => {
    expect(
      await ordersService.updateStatusOrderWithCode({
        id: 2,
        email: 'testemail@gmail.com',
        code: 'adfnbc',
      }),
    ).toEqual({
      messages: 'Verify code success!',
      status: 200,
    });
  });
});
