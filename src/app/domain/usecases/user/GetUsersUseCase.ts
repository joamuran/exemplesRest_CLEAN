import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetUsersUseCase {
  // El cas d'ús s'inicialitza amb una interfície del repositori
  constructor(private userRepo: IUserRepository) {}

  async execute() {
    return this.userRepo.findAll();
  }
}