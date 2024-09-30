import {cartsCollection, CartType, ProductWithCount} from "./db";

export const cartRepository = {
    async findCartByUserId(userId: number): Promise<CartType | null> {
        const cart: CartType | null = await cartsCollection.findOne({userId})
        if (cart) {
            return cart
        } else {
            const newCart: CartType = {
                userId,
                itemsInCart: [],
                totalPrice: 0
            }
            await cartsCollection.insertOne(newCart)
            return newCart
        }
    },
    async addItemToCart(userId: number, itemsInCart: ProductWithCount[], totalPrice: number): Promise<any> {
        const result = await cartsCollection.updateOne(
            { userId },
            { $set: { itemsInCart: itemsInCart, totalPrice: totalPrice } }
        )
        if (result) {
            return `Cart updated successfully!`
        }
        else {
            return `Failed to update`
        }
    }
}