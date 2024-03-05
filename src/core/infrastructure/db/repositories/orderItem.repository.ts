import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from '@entities';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from '@dtos';

@Injectable()
export class OrderItemRepository {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repository: Repository<OrderItem>,
  ) {}

  async create( createOrderItemDto: CreateOrderItemDto | any): Promise<OrderItem | any> {
    const orderItem = this.repository.create({
      ...createOrderItemDto,
    });
    return this.repository.save(orderItem);
  }

  async save(orderItem: OrderItem): Promise<OrderItem> {
    return this.repository.save(orderItem);
  }

  async findOne(orderItemId: number): Promise<OrderItem> {
    return await this.repository.findOneBy({ id: orderItemId});
  }

  async findOneByOrderId(orderId: number, createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return await this.repository.findOne({
      where: {
        order: { id: orderId },
        product: { id: createOrderItemDto.productId },
      },
    });
  }

  async updateQuantity(orderItemId: number, quantity: number): Promise<OrderItem> {
    const orderItem = await this.findOne(orderItemId);
    orderItem.quantity += quantity; // Ajuste esta lógica conforme sua necessidade
    return this.repository.save(orderItem);
  }

  async remove(orderItemId: number): Promise<void> {
    const result = await this.repository.delete(orderItemId);
    if (result.affected === 0) {
      throw new NotFoundException(`OrderItem #${orderItemId} not found`);
    }
  }

  async findByOrderId(orderId: number): Promise<OrderItem[]> {
    return this.repository.find({
      where: { order: { id: orderId } },
    });
  }

}
