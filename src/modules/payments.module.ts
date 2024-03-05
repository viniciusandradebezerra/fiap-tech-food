import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, Payment } from '@entities';
import { PaymentController } from '@controllers';
import { PaymentService } from '@services';
import { OrdersRepository, PaymentRepository } from '@repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order]),],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, OrdersRepository],
})
export class PaymentsModule {}
