import {Collection, MongoClient, ServerApiVersion} from "mongodb";

export type UserType = {
    id: number
    username: string
    password: string
}

export type ProductType = {
    productId: number
    name: string
    price: number
    date: string
    status: 'On sale' | 'Sold'
    image: string
    userId: number
}

export type ProductWithCount = ProductType & { count: number }

export type CartType = {
    userId: number
    itemsInCart: ProductWithCount[]
    totalPrice: number
}

export type ProductInHistoryType = {
    productId: number
    name: string
    price: number
    dateOfBuy: string
    image: string
}

export type HistoryType = {
    userId: number
    itemsInHistory: ProductInHistoryType[]
}

//const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"
const mongoUri = "mongodb+srv://sellaite505:kdHZ0qno92Q7s5P2@shopy-test-task.in5tj.mongodb.net/?retryWrites=true&w=majority&appName=shopy-test-task"

//export const client = new MongoClient(mongoUri)
export const client = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db("Shopy")
export const productsCollection: Collection<ProductType> = db.collection<ProductType>("products")
export const usersCollection: Collection<UserType> = db.collection<UserType>("users")
export const cartsCollection: Collection<CartType> = db.collection<CartType>("carts")
export const historyCollection: Collection<HistoryType> = db.collection<HistoryType>("history")

export const runDb = async () => {
    try {
        await client.connect()
        await client.db("products").command({ping: 1})
        console.log("Connected successfully to mongo server")
    } catch {
        await client.close()
        console.log("Can't connect to DB")
    }
}