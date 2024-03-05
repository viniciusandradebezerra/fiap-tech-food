import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "@services";
import { Order, Product, OrderItem, Payment, User, Attendant } from "@entities";
import { OrdersRepository, ProductsRepository, AttendantRepository, PaymentRepository, UsersRepository, OrderItemRepository } from "@repositories";
import { OrdersController } from "@controllers";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, OrderItem, Payment, User, Attendant])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, ProductsRepository, AttendantRepository, PaymentRepository, UsersRepository, OrderItemRepository],
})
export class OrdersModule {}
