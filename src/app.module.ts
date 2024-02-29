import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AttendantsModule } from './modules/attendants.module';
import { ProductsModule } from './modules/products.module';
import { CategoriesModule } from './modules/categories.module';
import { OrdersModule } from './modules/orders.module';
import { DeliveriesModule } from './modules/deliveries.module';
import { PaymentsModule } from './modules/payments.module';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, AttendantsModule, TypeOrmModule.forRoot(config), ProductsModule, CategoriesModule, OrdersModule, DeliveriesModule, PaymentsModule, TerminusModule, HttpModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
