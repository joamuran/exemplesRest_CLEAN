import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "../../domain/usecases/user/CreateUserUseCase";
import { GetUsersUseCase } from "../../domain/usecases/user/GetUsersUseCase";
import { GetUserByIdUseCase } from "../../domain/usecases/user/GetUserByIdUseCase";

// Controlador dels usuaris: S'encarrega de rebre les peticions, proporcionar-li
// als diferents casos d'ús la informació que necessiten per executar-se, i a partir 
// de la resposta dels casos d'us, "presentar" la resposta per a l'usuari o aplicació client.

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
