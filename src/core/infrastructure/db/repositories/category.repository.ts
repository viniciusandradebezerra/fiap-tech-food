// category.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findOneByName(name: string): Promise<Category> {
    return this.repository.findOne({ where: { name } });
  }

  async createIfNotExists(name: string): Promise<Category> {
    const existingCategory = await this.findOneByName(name);
    if (!existingCategory) {
      const newCategory = this.repository.create({ name });
      return this.repository.save(newCategory);
    }
    return existingCategory;
  }
}
