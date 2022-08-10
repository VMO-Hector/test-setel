import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
export class TransactionDto {
  @IsNumber()
  @IsNotEmpty()
  id_order: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  address: string;
}
