import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttendantDto } from './dto/create-attendant.dto';
import { UpdateAttendantDto } from './dto/update-attendant.dto';
import { Attendant } from './entities/attendant.entity';

@Injectable()
export class AttendantsService {
  constructor(
    @InjectRepository(Attendant)
    private attendantRepository: Repository<Attendant>,
  ) {}
  create(createAttendantDto: CreateAttendantDto) {
    return this.attendantRepository.save(createAttendantDto);
  }

  findAll() {
    return this.attendantRepository.find();
  }

  findOne(id: number) {
    return this.attendantRepository.findOneBy({ id: id });
  }

  update(id: number, updateAttendantDto: UpdateAttendantDto) {
    this.attendantRepository.update(id, updateAttendantDto);
    return this.findOne(id)
  }

   async remove(id: number): Promise<{message: string}> {
    const result = await this.attendantRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Attendant with ID ${id} not found`);
    }

    return { message: `Attendant with ID ${id} has been successfully deleted`}
  }
}
