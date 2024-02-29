import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';


@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order) 
  @JoinColumn({ name: 'orderId' }) 
  order: Order;

  @Column()
  orderId: number;

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
