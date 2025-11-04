import { IProductRepository } from "../../repositories/IProductRepository";


export class GetProductsUseCase {
  constructor(private userRepo: IProductRepository) {}

  async execute() {
    return this.userRepo.findAll();
  }
}