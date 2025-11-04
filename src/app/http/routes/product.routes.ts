import { Router } from "express";
import { CreateProductUseCase } from "../../domain/usecases/products/CreateProductUseCase";
import { GetProductByIdUseCase } from "../../domain/usecases/products/GetProductByIdUseCase";
import { GetProductsUseCase } from "../../domain/usecases/products/GetProductsUseCase";
import { ProductRepositoryInMemory } from "../../infrastructure/dataSources/inMemory/ProductRepositotyInMemory";
import { ProductController } from "../controllers/product.controller";

// Creem una implementació del repositori
const repo = new ProductRepositoryInMemory();

// Creem el Controlador per als usuaris, proporcionant-li
// instàncies dels casos d'ús, que al seu temps hem inicialitzat
// amb el repositori (injecció de dependències)
const controller = new ProductController(
  new CreateProductUseCase(repo),
  new GetProductsUseCase(repo),
  new GetProductByIdUseCase(repo)
);


const ProductRouter = Router();
// Definim les rutes dins aquest router i enllacem amb les
// funcions corresponents del controlador.
ProductRouter.post("/", controller.create);
ProductRouter.get("/", controller.getAll);
ProductRouter.get("/:id", controller.getById);


// Exportem el router
export default ProductRouter;



/*
import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { CreateProductUseCase } from "../../domain/usecases/products/CreateProductUseCase";

// Creem una implementació del repositori
const repo = new ProductRepositoryInMemory();

// Creem el Controlador per als usuaris, proporcionant-li
// instàncies dels casos d'ús, que al seu temps hem inicialitzat
// amb el repositori (injecció de dependències)
const controller = new ProductController(
  new CreateProductUseCase(repo),
  new GetProductsUseCase(repo),
  new GetProductByIdUseCase(repo)
);


const ProductRouter = Router();
// Definim les rutes dins aquest router i enllacem amb les
// funcions corresponents del controlador.
ProductRouter.post("/", controller.create.bind(controller));
ProductRouter.get("/", controller.getAll.bind(controller));
ProductRouter.get("/:id", controller.getById.bind(controller));


// Exportem el router
export default ProductRouter;
*/