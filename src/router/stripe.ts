import {Request, Response, Router} from "express";
import Stripe from "stripe";
import {ProductWithCount} from "../repository/db";

export const stripeRouter = Router({})

const stripe: Stripe = new Stripe(`sk_test_51Q2u9203aO49S2nLVZjejcWTcPdhrqkVtXRnBVo1qiLWgGy27lkHGvg1ctaqspemjEjNqgyvc9j50Yg2yFRRbayb00QuDQ0yKB`)

stripeRouter.post('/create-checkout-session', async (req: Request, res: Response) => {
    const {products} = req.body
    const lineItems = products.map((p: ProductWithCount) => ({
        price_data: {
            currency: 'USD',
            product_data: {
                name: p.name,
                images: [p.image]
            },
            unit_amount: Math.round(p.price * 100),
        },
        quantity: p.count
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        //success_url: "http://localhost:3000/payment/success",
        success_url: "https://shopy-test-task.onrender.com/payment/success",
        //cancel_url: "http://localhost:3000/payment/failed"
        cancel_url: "https://shopy-test-task.onrender.com/payment/failed"
    })
    res.json({id: session.id})
})