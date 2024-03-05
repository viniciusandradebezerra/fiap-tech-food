import { EOrdersStatus } from "@enums";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { Attendant, Delivery, OrderItem, Payment, User } from "@entities";

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

  @OneToMany(() => Payment, payment => payment.order, { eager: false })
  payment: Payment;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @ManyToOne(() => Delivery)
  @JoinColumn({ name: 'deliveryId' })
  delivery: Delivery;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { eager: false })
  items: OrderItem[];
}
