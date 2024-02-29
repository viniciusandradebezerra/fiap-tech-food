import { Module, OnModuleInit } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/core/application/services';
import { Category } from 'src/core/domain/entities';
import { CategoriesRepository } from 'src/core/infrastructure/db/repositories';
import { CategoriesController } from 'src/core/infrastructure/http/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule implements OnModuleInit {
  constructor(private readonly categoriesService: CategoriesService) {}

  async onModuleInit() {
    await this.categoriesService.initializeCategories();
  }
}
