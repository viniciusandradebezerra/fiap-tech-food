// categories.service.ts

import { Injectable } from "@nestjs/common";
import { Category } from "@entities";
import { CategoriesRepository } from "@repositories";


@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async initializeCategories(): Promise<void> {
    const categoriesData = [
      { name: "Sanduíches" },
      { name: "Bebidas Frias" },
      { name: "Bebidas Quentes" },
      { name: "Combos" },
      { name: "Sobremesas" },
      { name: "Acompanhamentos" },
      { name: "Café da Manhã" }
    ];

    for (const categoryData of categoriesData) {
      await this.categoryRepository.createIfNotExists(categoryData.name);
    }
  }
}
