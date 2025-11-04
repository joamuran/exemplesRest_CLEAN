import { Product } from "../entities/Product";

// Definim el comportament del repositori d'usuaris

export interface IProductRepository {
  create(product: Omit<Product, "id" | "createdAt">): Promise<Product>; //  Mètode create: Crea un nou producte. Retorna una promesa amb el producte creat
  findById(id: number): Promise<Product | null>;  // Mètode per buscar un usuari per id. Retorna una promesa amb l'usuari 
  findAll(): Promise<Product[]>;
}