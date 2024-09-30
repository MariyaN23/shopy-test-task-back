import express from 'express'
import {productsRouter} from "./router/products-router";
import {runDb} from "./repository/db";
import cors from 'cors'
import {authRouter} from "./router/auth-router";
import {stripeRouter} from "./router/stripe";
import {cartRouter} from "./router/cart-router";
import cookieParser from "cookie-parser";
import {historyRouter} from "./router/history-router";

const app = express()

export const corsOptions = {
    //origin: ['http://localhost:3000', 'https://shopy-test-task.onrender.com'],
    origin: 'https://shopy-test-task.onrender.com',
    credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())

const port = process.env.PORT || 5000

app.use(express.json())

app.use('/products', productsRouter)
app.use('/auth', authRouter)
app.use('/stripe', stripeRouter)
app.use('/cart', cartRouter)
app.use('/history', historyRouter)

const startApp = async ()=> {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()