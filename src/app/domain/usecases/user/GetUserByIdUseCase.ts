import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetUserByIdUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(id: number) {
    return this.userRepo.findById(id);
  }
}