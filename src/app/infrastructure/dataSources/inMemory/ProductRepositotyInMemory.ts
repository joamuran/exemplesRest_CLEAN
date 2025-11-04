import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { Product } from "../../../domain/entities/Product";
import { ProductMapper } from "../../mappers/ProductMapper";
import { ProductRecord } from "./models/ProductRecord";
import { productes } from "../../../data/dades";

export class ProductRepositoryInMemory implements IProductRepository {
  private Products: ProductRecord[] = productes;

  async create(Product: Omit<Product, "id" | "createdAt">): Promise<Product> {
    const nextId = this.Products.length === 0 ? 1 : Math.max(...this.Products.map(u => u.id)) + 1;

    const record: ProductRecord = {
      id: nextId,
      createdAt: new Date().toISOString(),
      ...Product
    };

    this.Products.push(record);

    return ProductMapper.toDomain(record);
  }

  async findById(id: number): Promise<Product | null> {
    const record = this.Products.find(u => u.id === id);
    return record ? ProductMapper.toDomain(record) : null;
  }

  async findAll(): Promise<Product[]> {
    return this.Products.map(ProductMapper.toDomain);
  }
}
