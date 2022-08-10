import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository, DataSource } from 'typeorm';
import { ExceptionMessages } from '../../shares/enums';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private product: Repository<Products>,
  ) { }

  async getAll(): Promise<Products[]> {
    try {
      return this.product.find();
    } catch (error) {
      throw new BadRequestException(ExceptionMessages.PRODUCT_NOT_FOUND);
    }
  }

  async getById(id: number): Promise<Products> {
    try {
      return this.product.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException(ExceptionMessages.PRODUCT_NOT_FOUND);
    }
  }

  async insertManyProduct() {
    try {
      const products = await this.product.find()
      if (!products.length) {
        await this.product.createQueryBuilder()
          .insert()
          .into(Products)
          .values([
            {
              name: 'Product 1',
              price: 1000,
              images: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            },
            {
              name: 'Product 2',
              price: 2000,
              images: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            },
            {
              name: 'Product 3',
              price: 3000,
              images: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            },
          ])
          .execute();
      }
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }
}
