import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from 'src/core/application/services';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

}
