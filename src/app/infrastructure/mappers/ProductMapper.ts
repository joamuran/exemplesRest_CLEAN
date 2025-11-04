// Mapper. Mapeja la representació de la capa de persistència a la capa de domini.

import { Product } from "../../domain/entities/Product";
import { ProductRecord } from "../dataSources/inMemory/models/ProductRecord";

export class ProductMapper {
    static toDomain(record: ProductRecord): Product {
        return {
            ...record,   // Propagació del registre. 
            createdAt: new Date(record.createdAt)
        };
    }

    // Quan trobem Omit<T, k>
    // El que fa és, a partir de ltipus T, elimina les propietats indicades en K
    // Omit<Product, "createdAt" | "id">: Vol dir Agafa Product, i lleva-li els paràmetres createdAt i id
    static toRecord(Product: Omit<Product, "createdAt" | "id"> & { createdAt: Date; id: number }): ProductRecord {
        return {
            ...Product,  // propagació de l'usuari: Expandeix els elements d'un iterable a lloc on s'esperen arguments o elements
            createdAt: Product.createdAt.toISOString()
        };
    }
}
