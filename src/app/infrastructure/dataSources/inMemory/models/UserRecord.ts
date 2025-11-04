// Aci definim els models de dades amb què es treballa 
// en esta capa de persistència (els DAO en altres contextos)

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  createdAt: string; // << guardat com string per exemple (ISO)
}
