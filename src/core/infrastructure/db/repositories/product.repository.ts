import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/core/domain/entities';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../../http/dtos';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.repository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repository.findOneBy({id: id});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.repository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: `Product with ID ${id} has been successfully deleted` };
  }
}
