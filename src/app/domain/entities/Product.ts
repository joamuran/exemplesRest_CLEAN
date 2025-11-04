// Les entitats del domini són conceptualment un conjunt de propietats essencials.
// La intenció de la capa de domini és definir què és un Producte, però no com funciona.
// Per a això, amb una Interface que descriga aquestes propietats és suficient.
// Ara bé, en cas que l'entitat necessite d'algun comportament, sí que serà necessari fer ús de classes.

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
}