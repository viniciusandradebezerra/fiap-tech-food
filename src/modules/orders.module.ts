import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "src/core/application/services";
import { Order, Product, OrderItem, Payment, User, Attendant } from "src/core/domain/entities";
import { OrdersRepository, ProductsRepository, AttendantRepository, PaymentRepository, UsersRepository, OrderItemRepository } from "src/core/infrastructure/db/repositories";
import { OrdersController } from "src/core/infrastructure/http/controllers";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, OrderItem, Payment, User, Attendant])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, ProductsRepository, AttendantRepository, PaymentRepository, UsersRepository, OrderItemRepository],
})
export class OrdersModule {}
