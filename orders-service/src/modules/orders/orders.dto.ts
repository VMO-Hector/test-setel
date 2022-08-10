import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  meta: string;
}

export class UpdateStatusDto {
  code?: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
