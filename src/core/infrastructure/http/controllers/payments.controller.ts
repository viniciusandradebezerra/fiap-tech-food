import { EPaymentStatus } from '@enums';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from '@services';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':id')
  async receivePaymentNotification(@Param('id') id: number, @Body() status: EPaymentStatus): Promise<void> {
    return await this.paymentService.handlePaymentNotification(id, status);
  }
}