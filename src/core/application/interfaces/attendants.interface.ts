import { Attendant } from "src/core/domain/entities";
import { CreateAttendantDto, UpdateAttendantDto } from "@dtos";


export interface IAttendantsRepository {
  create(createAttendantDto: CreateAttendantDto): Promise<Attendant>;
  findAll(): Promise<Attendant[]>;
  findOne(id: number): Promise<Attendant>;
  update(id: number, updateAttendantDto: UpdateAttendantDto): Promise<Attendant>;
  remove(id: number): Promise<{ message: string }>;
}

export interface IAttendantsService {
    create(createAttendantDto: CreateAttendantDto): Promise<Attendant>;
    findAll(): Promise<Attendant[]>;
    findOne(id: number): Promise<Attendant>;
    update(id: number, updateAttendantDto: UpdateAttendantDto): Promise<Attendant>;
    remove(id: number): Promise<{ message: string }>;
  }
