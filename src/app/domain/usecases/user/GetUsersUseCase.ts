// Implementació del cas d'Us per obtenir una llista d'usuaris.
// Quan es crea (al constructor), rep un repositori que implementa una interfície IUserRepository.
// La implementació concreta del repositori la farà altra classe, i ja ens ve "injectada" en el consturtor.
// Com a cas d'ús, només necessitarem fer ús dels mètodes que ens proporciona aquesta interfície, 
// sense preocupar-nos de com estiga implementada.

import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetUsersUseCase {
  // El cas d'ús s'inicialitza amb una interfície del repositori
  constructor(private userRepo: IUserRepository) {}

  async execute() {
    return this.userRepo.findAll();
  }
}