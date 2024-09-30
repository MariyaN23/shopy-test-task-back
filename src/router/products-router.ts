import {Request, Response, Router} from "express";
import {productsService} from "../service/products-service";
import {body} from "express-validator";
import {validationMiddleware} from "../middleware/validation";
import {ProductType} from "../repository/db";
import {corsOptions} from "../index";
import cors from "cors";

export const productsRouter = Router({})

const productNameValidation = body('name').trim().isLength({
    min: 3,
    max: 30
}).withMessage("Product name should be from 3 to 30 symbols")

const priceValidation = body('price').trim().isFloat({
    min: 1,
    max: 10000
}).withMessage("Price should be from 1 to 10 000 $")

productsRouter.get('/', cors(corsOptions), async (req: Request, res: Response) => {
    const response = await productsService.findProduct(
        req.query.name?.toString(),
        req.query.min?.toString(),
        req.query.max?.toString(),
        req.query.order?.toString(),
        req.query.page?.toString(),
        req.query.pageSize?.toString())
    res.send(response)
})

productsRouter.get('/:id', cors(corsOptions), async (req: Request, res: Response) => {
    const foundProducts: ProductType[] | null = await productsService.findProductsByUserId(+req.params.id)
    foundProducts ? res.send(foundProducts) : res.send(404)
})

productsRouter.post('/',
    productNameValidation,
    priceValidation,
    validationMiddleware,
    async (req: Request, res: Response) => {
        const newProduct: ProductType = await productsService.createProduct(req.body.name, req.body.price, req.body.image, req.body.userId)
        res.status(201).send(newProduct)
    })

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted: boolean | undefined = await productsService.deleteProduct(+req.params.id)
    isDeleted ? res.send(204) : res.send(404)
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product: ProductType | null = await productsService.findProductById(+req.params.id)
    product ? res.send(product) : res.send(404)
})