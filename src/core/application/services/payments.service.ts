// payment.service.ts
import { Injectable } from '@nestjs/common';
import { OrdersRepository, PaymentRepository } from '@repositories';
import { EPaymentStatus } from '../enums/payment';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async handlePaymentNotification(
    id: number,
    status: string,
  ): Promise<any> {

    const order = await this.ordersRepository.findOne(id)

    return await this.paymentRepository.updateStatus(order.payment[0].id, status);
  }
}
