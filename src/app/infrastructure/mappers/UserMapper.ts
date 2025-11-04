// Mapper. Mapeja la representació de la capa de persistència a la capa de domini.

import { User } from "../../domain/entities/User";
import { UserRecord } from "../dataSources/inMemory/models/UserRecord";

export class UserMapper {
    static toDomain(record: UserRecord): User {
        return {
            ...record,   // Propagació del registre. 
            createdAt: new Date(record.createdAt)
        };
    }

    // Quan trobem Omit<T, k>
    // El que fa és, a partir de ltipus T, elimina les propietats indicades en K
    // Omit<User, "createdAt" | "id">: Vol dir Agafa User, i lleva-li els paràmetres createdAt i id
    static toRecord(user: Omit<User, "createdAt" | "id"> & { createdAt: Date; id: number }): UserRecord {
        return {
            ...user,  // propagació de l'usuari: Expandeix els elements d'un iterable a lloc on s'esperen arguments o elements
            createdAt: user.createdAt.toISOString()
        };
    }
}
