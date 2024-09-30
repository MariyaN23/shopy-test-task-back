import {Request, Response, Router} from "express";
import cors from "cors";
import {corsOptions} from "../index";
import {cartService} from "../service/cart-service";
import {CartType} from "../repository/db";

export const cartRouter = Router({})

cartRouter.get('/:userId', cors(corsOptions), async (req: Request, res: Response) => {
    try {
        const usersCart: CartType | null = await cartService.findCartByUserId(+req.params.userId)
        usersCart ? res.status(200).send(usersCart) : res.status(404).send(`Cart not found`)
    } catch (error) {
        res.status(500).send("An error occurred while fetching cart")
    }
})

cartRouter.post('/:userId', async (req: Request, res: Response) => {
    try {
        const response: string | null = await cartService.addItemsToCart(+req.params.userId, req.body.itemsInCart, req.body.totalPrice)
        response ? res.status(200).send(response) : res.status(404).send(`Cart not found`)
    } catch (error) {
        res.status(500).send("An error occurred while adding to cart")
    }
})
