import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Order, Product } from '@entities';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order) 
  @JoinColumn({ name: 'orderId' }) 
  order: Order;

  @ManyToOne(() => Product) 
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number; 

  @Column()
  quantity: number;

  @Column({ type: 'float' })
  unitPrice: number;
}
