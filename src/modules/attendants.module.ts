import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendantsService } from '@services';
import { Attendant } from '@entities';
import { AttendantRepository } from '@repositories';
import { AttendantsController } from '@controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Attendant])],
  controllers: [AttendantsController],
  providers: [AttendantsService, AttendantRepository],
})

export class AttendantsModule {}