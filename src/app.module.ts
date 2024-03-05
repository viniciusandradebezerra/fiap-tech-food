import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendantsModule, ProductsModule, CategoriesModule, OrdersModule, DeliveriesModule, PaymentsModule, UsersModule } from '@modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, AttendantsModule, TypeOrmModule.forRoot(config), ProductsModule, CategoriesModule, OrdersModule, DeliveriesModule, PaymentsModule, TerminusModule, HttpModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
