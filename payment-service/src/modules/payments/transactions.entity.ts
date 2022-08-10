import { IsEnum } from 'class-validator';
import { PaymentStatus } from '../../shares';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_order: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  price: number;

  @Column({ type: 'text' })
  address: string;

  @Column()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
