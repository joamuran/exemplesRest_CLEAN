import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { UserMapper } from "../../mappers/UserMapper";
import { UserRecord } from "./models/UserRecord";
import { usuaris } from "../../../data/dades";

export class UserRepositoryInMemory implements IUserRepository {
  private users: UserRecord[] = usuaris;

  async create(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const nextId = this.users.length === 0 ? 1 : Math.max(...this.users.map(u => u.id)) + 1;

    const record: UserRecord = {
      id: nextId,
      createdAt: new Date().toISOString(),
      ...user
    };

    this.users.push(record);

    return UserMapper.toDomain(record);
  }

  async findById(id: number): Promise<User | null> {
    const record = this.users.find(u => u.id === id);
    return record ? UserMapper.toDomain(record) : null;
  }

  async findAll(): Promise<User[]> {
    return this.users.map(UserMapper.toDomain);
  }
}
