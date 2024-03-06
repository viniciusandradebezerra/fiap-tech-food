import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EPaymentMethod, EPaymentStatus } from '@enums';
import { Payment, Order } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async create(order: Order, createPaymentDto: any): Promise<Payment> {
    const payment = this.repository.create({
      order: order,
      method: EPaymentMethod[createPaymentDto.method],
      status: EPaymentStatus.PENDING, // Default status, adjust as needed
      value: order.amount,
    });
    return this.repository.save(payment);
  }

  async findOne(paymentId: number): Promise<Payment> {
    const payment = await this.repository.findOne({
      where: { id: paymentId },
      relations: ['order'], // Include relations as needed
    });
    if (!payment) {
      throw new NotFoundException(`Payment #${paymentId} not found`);
    }
    return payment;
  }

  async updateStatus(paymentId: number, status: any): Promise<Payment> {
    const payment = await this.findOne(paymentId);
    payment.status = status.status;
    return this.repository.save(payment);
  }
}
