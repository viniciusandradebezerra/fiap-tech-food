import { Module, OnModuleInit } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entites/category.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule implements OnModuleInit {
  constructor(private readonly categoriesService: CategoriesService) {}

  async onModuleInit() {
    await this.categoriesService.initializeCategories();
  }
}
