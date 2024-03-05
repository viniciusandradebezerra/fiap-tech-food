import { EDeliveryStatus } from "@enums";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Order } from "@entities";

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order)
  @JoinColumn()
  order: Order;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'text' })
  status: EDeliveryStatus;
}
