import { User } from "../entities/User";

// Definim el comportament del repositori d'usuaris
export interface IUserRepository {
  Promise<User>; //  Mètode create: Crea un nou usuari. Retorna una promesa amb l'usuari creat
  create(user: Omit<User, "id" | "createdAt">): 
  // Mètode per buscar un usuari per id. Retorna una promesa amb l'usuari 
  findById(id: number): Promise<User | null>; 
  // Mètode per Obtenir tots el usuaris. També torna la llista de Users en un Promise
  findAll(): Promise<User[]>;
}