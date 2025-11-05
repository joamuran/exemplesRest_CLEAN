import { Product } from "../entities/Product";

// Definim el comportament del repositori d'usuaris

export interface IProductRepository {
  //  Mètode create: Crea un nou producte. Retorna una promesa amb el producte creat
  create(product: Omit<Product, "id" | "createdAt">): Promise<Product>;
  // Mètode per buscar un usuari per id. Retorna una promesa amb l'usuari 
  findById(id: number): Promise<Product | null>;
  // Mètode per Obtenir tots el productes. També torna la llista de Products en un Promise
  findAll(): Promise<Product[]>;
}