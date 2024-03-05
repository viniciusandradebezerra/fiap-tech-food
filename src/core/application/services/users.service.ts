import { Injectable } from "@nestjs/common";
import { User } from "@entities";
import { UsersRepository } from "@repositories";
import { CreateUserDto, UpdateUserDto } from "@dtos";


@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByCpf(cpf: string): Promise<User> {
    return this.userRepository.findByCpf(cpf);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    return this.userRepository.remove(id);
  }
}
