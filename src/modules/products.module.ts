import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsService } from "src/core/application/services";
import { Product } from "src/core/domain/entities";
import { ProductsRepository } from "src/core/infrastructure/db/repositories";
import { ProductsController } from "src/core/infrastructure/http/controllers";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
