import { Injectable } from "@nestjs/common";
import { Product } from "@entities";
import { ProductsRepository } from "@repositories";
import { CreateProductDto, UpdateProductDto } from "@dtos";


@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    return this.productRepository.remove(id);
  }
}
