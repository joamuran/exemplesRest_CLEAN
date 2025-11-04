import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "../../domain/usecases/user/CreateUserUseCase";
import { GetUsersUseCase } from "../../domain/usecases/user/GetUsersUseCase";
import { GetUserByIdUseCase } from "../../domain/usecases/user/GetUserByIdUseCase";

export class UserController {
    constructor(
        private createUser: CreateUserUseCase,      // Les funcions del controlador seran els casos d'ús
        private getUsers: GetUsersUseCase,
        private getUserById: GetUserByIdUseCase
    ) { }

    create=async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.createUser.execute(req.body);
            res.status(201).json(result);
        } catch (err) { next(err); }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.getUsers.execute());
        } catch (err) { next(err); }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let number;
            if (req.params.id == null) number = "-1";
            else number = req.params.id;
            const user = await this.getUserById.execute(Number.parseInt(number));
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user);
        } catch (err) { next(err); }
    }
}


/*import { CreateUserUseCase } from "../../domain/usecases/user/CreateUserUseCase";
import { GetUserByIdUseCase } from "../../domain/usecases/user/GetUserByIdUseCase";
import { GetUsersUseCase } from "../../domain/usecases/user/GetUsersUseCase";
import { CreateUserInterface } from "../interfaces/create.user.interface";

// Definim (i exportem) la classe pe al controlador
export class UserController {

    // Constructor
    constructor(
            private createUser: CreateUserUseCase,
    private getUsers: GetUsersUseCase,
    private getUserById: GetUserByIdUseCase
    ){}

    // Definim el mètode/middleware create, per a la creació d'usuaris.
    // Rebem:
    // - req: de tipus Request, amb la petició
    // - res: de tipus Response, per gestionar la resposta
    public create = (req: Request, res: Response) => {
        // Agafem el nom i l'email del body
        // Amb la interfície CreateUserInterface indiquem el format esperat en el body
        // (agafem el name i l'email que defineix la interfície del body)
        const { name, email }: CreateUserInterface = req.body;

        // Comprovem que els valors no siguen nuls
        if (!name || !email) {
            return res.status(400).json({ message: "El nom i l'email són obligatoris" });
        }

        // Creem el JSON amb el nou usuari
        const newUser = {
            id: (usuaris.length + 1).toString(),
            name,
            email,
            createdAt: new Date().toISOString(),
        };

        // Afegim l'usuari a la llista d'usuaris
        usuaris.push(newUser);

        // I retornem l'usuari creat en la resposta
        res.status(201).json(newUser);
    };


    // Mètode/Middleware per retornar la llista d'usuaris
    public getAll = (req: Request, res: Response) => {
        res.status(200).json(usuaris);
    };

    // Mètode/Middleware per retornar les dades d'un usuari concret
    public getById = (req: Request, res: Response) => {
        const id = req.params.id;

        // Mètode find del vector (funció fletxa)
        const user = usuaris.find(u => u.id === id);
        // Seria equivalent a:  const user = usuaris.find( function(u){ return u.id === id});


        if (user) { // Si hem trobat l'usuari, el retornem
            res.status(200).json(user);
        } else { // En cas contrari retornem l'error de recurs no trobat
            res.status(404).json({ message: "Usuari no trobat" });
        }
    };
}



*/