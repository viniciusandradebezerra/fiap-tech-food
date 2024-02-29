// src/core/application/services/attendants.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { Attendant } from "src/core/domain/entities";
import { AttendantRepository } from "src/core/infrastructure/db/repositories";
import { CreateAttendantDto, UpdateAttendantDto } from "src/core/infrastructure/http/dtos";

@Injectable()
export class AttendantsService {
  constructor(private readonly attendantRepository: AttendantRepository) {}

  async create(createAttendantDto: CreateAttendantDto): Promise<Attendant> {
    return this.attendantRepository.create(createAttendantDto);
  }

  async findAll(): Promise<Attendant[]> {
    return this.attendantRepository.findAll();
  }

  async findOne(id: number): Promise<Attendant> {
    const attendant = await this.attendantRepository.findOne(id);
    if (!attendant) {
      throw new NotFoundException(`Attendant with ID ${id} not found`);
    }
    return attendant;
  }

  async update(id: number, updateAttendantDto: UpdateAttendantDto): Promise<Attendant> {
    await this.attendantRepository.update(id, updateAttendantDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    return this.attendantRepository.remove(id);
  }
}
