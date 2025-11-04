// Aci definim els models de dades amb què es treballa 
// en esta capa de persistència (els DAO en altres contextos)

export interface ProductRecord {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: string; // << guardat com string per exemple (ISO)
}
