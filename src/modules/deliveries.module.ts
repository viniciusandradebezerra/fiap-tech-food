import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
})
export class DeliveriesModule {}
