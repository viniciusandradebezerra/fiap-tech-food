import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '@entities';
import { In, Not, Repository } from 'typeorm';
import { CreateOrderDto } from '@dtos';
import { FindOrdersParams } from '@interfaces';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.repository.create(createOrderDto);
    return this.repository.save(order);
  }

  async find(params: FindOrdersParams): Promise<Order[]> {
    const { excludeStatus, orderByStatus }: any = params;

    const whereCondition = excludeStatus ? { status: Not(In(excludeStatus)) } : {};
    
    let orders = await this.repository.find({
      where: whereCondition
    });

   
    if (orderByStatus) {
        orders.sort((a, b) => orderByStatus.indexOf(a.status) - orderByStatus.indexOf(b.status));
    }

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
