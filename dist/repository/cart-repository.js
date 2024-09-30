"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRepository = void 0;
const db_1 = require("./db");
exports.cartRepository = {
    findCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield db_1.cartsCollection.findOne({ userId });
            if (cart) {
                return cart;
            }
            else {
                const newCart = {
                    userId,
                    itemsInCart: [],
                    totalPrice: 0
                };
                yield db_1.cartsCollection.insertOne(newCart);
                return newCart;
            }
        });
    },
    addItemToCart(userId, itemsInCart, totalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.cartsCollection.updateOne({ userId }, { $set: { itemsInCart: itemsInCart, totalPrice: totalPrice } });
            if (result) {
                return `Cart updated successfully!`;
            }
            else {
                return `Failed to update`;
            }
        });
    }
};
