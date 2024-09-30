"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCart = exports.createCart = void 0;
const createCart = () => {
    return {
        items: {},
        totalQty: 0,
        totalPrice: 0
    };
};
exports.createCart = createCart;
const addProductToCart = (cart, product, productId) => {
    const updatedCart = Object.assign({}, cart);
    const storedItem = updatedCart.items[productId];
    if (!storedItem) {
        updatedCart.items[productId] = { item: product, qty: 0, price: 0 };
    }
    updatedCart.items[productId].qty++;
    updatedCart.items[productId].price = updatedCart.items[productId].item.price * updatedCart.items[productId].qty;
    updatedCart.totalQty++;
    updatedCart.totalPrice += updatedCart.items[productId].item.price;
    return updatedCart;
};
exports.addProductToCart = addProductToCart;
