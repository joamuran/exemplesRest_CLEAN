import { Request, Response, NextFunction } from "express";
import { CreateProductUseCase } from "../../domain/usecases/products/CreateProductUseCase";
import { GetProductByIdUseCase } from "../../domain/usecases/products/GetProductByIdUseCase";
import { GetProductsUseCase } from "../../domain/usecases/products/GetProductsUseCase";

// Controlador dels productes: S'encarrega de rebre les peticions, proporcionar-li
// als diferents casos d'ús la informació que necessiten per executar-se, i a partir 
// de la resposta dels casos d'us, "presentar" la resposta per a l'usuari o aplicació client.

export class ProductController {
    constructor(
        private createProduct: CreateProductUseCase,      // Les funcions del controlador seran els casos d'ús
        private getProducts: GetProductsUseCase,
        private getProductById: GetProductByIdUseCase
    ) { }

    create=async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.createProduct.execute(req.body.name, req.body.price, req.body.stock);
            // const result = await this.createProduct.execute(req.body); // Així va en users però no aci...
            res.status(201).json(result);
        } catch (err) { next(err); }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {            
            res.json(await this.getProducts.execute());
        } catch (err) { next(err); }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let number;
            if (req.params.id == null) number = "-1";
            else number = req.params.id;
            const product = await this.getProductById.execute(Number.parseInt(number));
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.json(product);
        } catch (err) { next(err); }
    }
}

