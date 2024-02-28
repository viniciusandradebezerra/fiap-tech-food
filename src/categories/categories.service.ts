import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entites/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  async initializeCategories() {
    const categories = [
      { name: "Sanduíches" },
      { name: "Bebidas Frias" },
      { name: "Bebidas Quentes" },
      { name: "Combos" },
      { name: "Sobremesas" },
      { name: "Acompanhamentos" },
      { name: "Café da Manhã" }
    ];

    for (const categoryData of categories) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: categoryData.name } });
      if (!existingCategory) {
        const category = this.categoryRepository.create(categoryData);
        await this.categoryRepository.save(category);
      }
    }
  }
}
