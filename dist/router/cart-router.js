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
exports.cartRouter = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const index_1 = require("../index");
const cart_service_1 = require("../service/cart-service");
exports.cartRouter = (0, express_1.Router)({});
exports.cartRouter.get('/:userId', (0, cors_1.default)(index_1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersCart = yield cart_service_1.cartService.findCartByUserId(+req.params.userId);
        usersCart ? res.status(200).send(usersCart) : res.status(404).send(`Cart not found`);
    }
    catch (error) {
        res.status(500).send("An error occurred while fetching cart");
    }
}));
exports.cartRouter.post('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield cart_service_1.cartService.addItemsToCart(+req.params.userId, req.body.itemsInCart, req.body.totalPrice);
        response ? res.status(200).send(response) : res.status(404).send(`Cart not found`);
    }
    catch (error) {
        res.status(500).send("An error occurred while adding to cart");
    }
}));
