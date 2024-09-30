import {cartRepository} from "../repository/cart-repository";
import {CartType, ProductWithCount} from "../repository/db";

export const cartService = {
    async findCartByUserId(userId: number): Promise<CartType | null> {
        return cartRepository.findCartByUserId(userId)
    },
    async addItemsToCart(userId: number, itemsInCart: ProductWithCount[], totalPrice: number): Promise<string> {
        return cartRepository.addItemToCart(userId, itemsInCart, totalPrice)
    },
}