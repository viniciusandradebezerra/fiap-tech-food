// src/core/infrastructure/db/repositories/attendant.repository.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendant } from "@entities";
import { Repository } from "typeorm";
import { CreateAttendantDto, UpdateAttendantDto } from "@dtos";

@Injectable()
export class AttendantRepository {
  constructor(
    @InjectRepository(Attendant)
    private readonly repository: Repository<Attendant>,
  ) {}

  async create(createAttendantDto: CreateAttendantDto): Promise<Attendant> {
    return this.repository.save(createAttendantDto);
  }

  async findAll(): Promise<Attendant[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Attendant> {
    return this.repository.findOneBy({id: id});
  }

  async update(id: number, updateAttendantDto: UpdateAttendantDto): Promise<Attendant> {
    await this.repository.update(id, updateAttendantDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Attendant with ID ${id} not found`);
    }
    return { message: `Attendant with ID ${id} has been successfully deleted` };
  }
}
