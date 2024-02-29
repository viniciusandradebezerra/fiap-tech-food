import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "src/core/application/services";
import { User } from "src/core/domain/entities";
import { UsersRepository } from "src/core/infrastructure/db/repositories";
import { UsersController } from "src/core/infrastructure/http/controllers";


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
