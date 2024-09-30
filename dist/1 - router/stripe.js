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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeRouter = void 0;
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
exports.stripeRouter = (0, express_1.Router)({});
const stripe = new stripe_1.default(`sk_test_51Q2u9203aO49S2nLVZjejcWTcPdhrqkVtXRnBVo1qiLWgGy27lkHGvg1ctaqspemjEjNqgyvc9j50Yg2yFRRbayb00QuDQ0yKB`);
exports.stripeRouter.post('/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = req.body;
    const lineItems = products.map((p) => ({
        price_data: {
            currency: 'USD',
            product_data: {
                name: p.name,
                images: [p.image]
            },
            unit_amount: Math.round(p.price * 100),
        },
        quantity: p.count
    }));
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        /*line_items: [{
            price: "price_1Q3BoG03aO49S2nLdPHNILqy",
            quantity: 1
        }],*/
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/payment/success",
        cancel_url: "http://localhost:3000/payment/failed"
    });
    res.json({ id: session.id });
}));
