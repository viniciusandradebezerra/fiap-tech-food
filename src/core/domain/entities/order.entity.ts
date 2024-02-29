import { EOrdersStatus } from "src/core/application/enums";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { Attendant } from "./attendant.entity";
import { Delivery } from "./delivery.entity";
import { OrderItem } from "./order-item.entity";
import { Payment } from "./payment.entity";
import { User } from "./user.entity";


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Attendant)
  @JoinColumn({ name: 'attendantId' })
  attendant: Attendant;

  @Column({
    type: "varchar",
    default: EOrdersStatus.IN_PREPARATION
  })
  status: string;

  @ManyToOne(() => Payment)
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @ManyToOne(() => Delivery)
  @JoinColumn({ name: 'deliveryId' })
  delivery: Delivery;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { eager: false })
  items: OrderItem[];
}
