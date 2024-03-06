import { EPaymentMethod, EPaymentStatus } from 'src/core/application/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Order } from '@entities';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ type: 'text' })
  method: EPaymentMethod;

  @Column({
    type: 'text',
    transformer: {
      to: (value: any) => value,
      from: (value: any) => String(value), 
    },
    default: EPaymentStatus.PENDING,
  })
  status: string;

  @Column({ type: 'float' })
  value: number;
}
