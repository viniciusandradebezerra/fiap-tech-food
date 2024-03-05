import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from '@services';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

}
