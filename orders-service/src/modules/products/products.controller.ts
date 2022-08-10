import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('product')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  async getAllProduct(): Promise<Products[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Products> {
    return this.productService.getById(id);
  }

  @Post()
  async seedData() {
    return this.productService.insertManyProduct();
  }
}
