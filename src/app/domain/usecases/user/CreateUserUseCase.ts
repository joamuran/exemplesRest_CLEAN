// Els casos d'ús representen la lògica de negoci; què és el que pot fer l'aplicació.
// En l'arquitectura anterior, hem incorporat la lògica de negoci en el propi controlador, 
// però els controladors el que han de fer és controlar les peticions HTTP, no la lògica de 
// l'aplicació, per això s'introdueix aquest capa de casos d'us (que seria pràcticament una 
// traducció literal del diagrama de casos d'ús de l'aplicació!)

// Implementació del cas d'Us per crear un usuari.
// Quan es crea (al constructor), rep un repositori que implementa una interfície IUserRepository.
// La implementació concreta del repositori la farà altra classe, i ja ens ve "injectada" en el consturtor.
// Com a cas d'ús, només necessitarem fer ús dels mètodes que ens proporciona aquesta interfície, 
// sense preocupar-nos de com estiga implementada.

import { IUserRepository } from "../../repositories/IUserRepository";

interface CreateUserDTO {
  name: string;
  email: string;
}

export class CreateUserUseCase {

  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email }: CreateUserDTO) {

    // (Opcional) **Validacions de domini**
    if (!name || !email) {
      throw new Error("Name and email are required.");
    }

    // (Opcional) Validar que no existeix email duplicat
    const existingUsers = await this.userRepository.findAll();
    if (existingUsers.some(u => u.email === email)) {
      throw new Error("Email already in use.");
    }

    // Deleguem la creació (id i createdAt) al repositori
    const user = await this.userRepository.create({ name, email });

    return user;
  }
}



/*import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string): Promise<User> {

    // (Opcional) Validacions de negoci
    if (!email.includes("@")) {
      throw new Error("El correu no és vàlid.");
    }

    // (Opcional) Evitar duplicats
    const existingUsers = await this.userRepository.findAll();
    if (existingUsers.some(u => u.email === email)) {
      throw new Error("Ja existeix un usuari amb aquest correu.");
    }

    // El repositori genera l'id automàticament
    const user = await this.userRepository.create({
      name,
      email
    });

    return user;
  }
}
*/