import { IProductRepository } from "../../../domain/repositories/IProductRepository";

export class GetProductByIdUseCase {
  constructor(private ProductRepo: IProductRepository) {}

  async execute(id: number) {
    return this.ProductRepo.findById(id);
  }
}