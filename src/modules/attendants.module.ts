import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendantsService } from 'src/core/application/services';
import { Attendant } from 'src/core/domain/entities';
import { AttendantRepository } from 'src/core/infrastructure/db/repositories';
import { AttendantsController } from 'src/core/infrastructure/http/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Attendant])],
  controllers: [AttendantsController],
  providers: [AttendantsService, AttendantRepository],
})

export class AttendantsModule {}