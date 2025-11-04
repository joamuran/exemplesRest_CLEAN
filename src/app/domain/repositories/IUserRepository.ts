import { User } from "../entities/User";

// Definim el comportament del repositori d'usuaris
export interface IUserRepository {
  create(user: Omit<User, "id" | "createdAt">): Promise<User>; //  Mètode create: Crea un nou usuari. Retorna una promesa amb l'usuari creat
  findById(id: number): Promise<User | null>; // Mètode per buscar un usuari per id. Retorna una promesa amb l'usuari 
  findAll(): Promise<User[]>;
}