import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { UsersService } from "@services";
import { CreateUserDto, UpdateUserDto } from "@dtos";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  
  @Get('/cpf/:cpf')
  findCpf(@Param('cpf') cpf: string) {
    return this.usersService.findByCpf(cpf);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
