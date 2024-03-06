import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '@entities';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '@dtos';
import { EOrdersStatus } from '@enums';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<any> {
    const order = await this.repository.create(createOrderDto);
    return this.repository.save(order);
  }

  async find(): Promise<Order[]> {
    const orders = await this.repository
      .createQueryBuilder('order')
      .where('order.status IN (:...statuses)', {
        statuses: [
          EOrdersStatus.CONFIRMATION,
          EOrdersStatus.IN_PREPARATION,
          EOrdersStatus.READY_DELIVERY,
          EOrdersStatus.SENT_DELIVERY,
        ],
      })
      .orderBy(`
        CASE 
          WHEN order.status = '${EOrdersStatus.CONFIRMATION}' THEN 1
          WHEN order.status = '${EOrdersStatus.IN_PREPARATION}' THEN 2
          WHEN order.status = '${EOrdersStatus.READY_DELIVERY}' THEN 3
          WHEN order.status = '${EOrdersStatus.SENT_DELIVERY}' THEN 4
        END
      `)
      .addOrderBy('order.created', 'ASC')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.attendant', 'attendant')
      .leftJoinAndSelect('order.payment', 'payment')
      .getMany();

    return orders;
  }

  async save(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.repository.findOne({
      where: { id: id },
      relations: ['items', 'user', 'attendant', 'payment'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async updateStatus(orderId: number, status: string): Promise<Order> {
    const order = await this.findOne(orderId);
    order.status = status;
    return this.repository.save(order);
  }

  async updateOrderTotalValue(
    orderId: number,
    totalValue: number,
  ): Promise<void> {
    const order = await this.findOne(orderId);
    order.amount = totalValue;
    await this.repository.save(order);
  }
}
