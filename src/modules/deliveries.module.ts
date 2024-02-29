import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/core/domain/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
})
export class DeliveriesModule {}
