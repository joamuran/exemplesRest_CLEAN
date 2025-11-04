// Els casos d'ús representen la lògica de negoci; què és el que pot fer l'aplicació.
// En l'arquitectura anterior, hem incorporat la lògica de negoci en el propi controlador, 
// però els controladors el que han de fer és controlar les peticions HTTP, no la lògica de 
// l'aplicació, per això s'introdueix aquest capa de casos d'us (que seria pràcticament una 
// traducció literal del diagrama de casos d'ús de l'aplicació!)


import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { Product } from "../../../domain/entities/Product";

export class CreateProductUseCase {
  constructor(private ProductRepository: IProductRepository) { }

  async execute(name: string, price: number, stock: number): Promise<Product> {


    // El repositori genera l'id automàticament
    const product = await this.ProductRepository.create({
      name,
      price,
      stock,

    });

    return product;
  }
}
