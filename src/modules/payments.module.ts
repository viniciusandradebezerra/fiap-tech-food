import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/core/domain/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]),],
})
export class PaymentsModule {}
