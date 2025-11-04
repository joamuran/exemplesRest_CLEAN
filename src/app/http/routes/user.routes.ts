import { Router } from "express";
import { UserRepositoryInMemory } from "../../infrastructure/dataSources/inMemory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../domain/usecases/user/CreateUserUseCase";
import { GetUsersUseCase } from "../../domain/usecases/user/GetUsersUseCase";
import { GetUserByIdUseCase } from "../../domain/usecases/user/GetUserByIdUseCase";
import { UserController } from "../controllers/user.controller";

// Creem una implementació del repositori
const repo = new UserRepositoryInMemory();

// Creem el Controlador per als usuaris, proporcionant-li
// instàncies dels casos d'ús, que al seu temps hem inicialitzat
// amb el repositori (injecció de dependències)
const controller = new UserController(
  new CreateUserUseCase(repo),
  new GetUsersUseCase(repo),
  new GetUserByIdUseCase(repo)
);


const userRouter = Router();
// Definim les rutes dins aquest router i enllacem amb les
// funcions corresponents del controlador.
userRouter.post("/", controller.create);
userRouter.get("/", controller.getAll);
userRouter.get("/:id", controller.getById);


// Exportem el router
export default userRouter;
