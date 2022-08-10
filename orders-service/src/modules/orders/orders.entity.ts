import { Exclude } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../shares/enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  price: number;

  @Column({type: 'text' })
  meta: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ default: OrderStatus.CREATED })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @Exclude()
  @Column()
  code: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
