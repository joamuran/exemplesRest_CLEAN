// Implementació del cas d'Us per obtenir la llista de productes
// Quan es crea (al constructor), rep un repositori que implementa una interfície IProductRepository.
// La implementació concreta del repositori la farà altra classe, i ja ens ve "injectada" en el consturtor.
// Com a cas d'ús, només necessitarem fer ús dels mètodes que ens proporciona aquesta interfície, 
// sense preocupar-nos de com estiga implementada.

import { IProductRepository } from "../../repositories/IProductRepository";


export class GetProductsUseCase {
  constructor(private userRepo: IProductRepository) {}

  async execute() {
    return this.userRepo.findAll();
  }
}