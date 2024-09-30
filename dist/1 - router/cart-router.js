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
const cart_service_1 = require("../2 - service/cart-service");
const cors_1 = __importDefault(require("cors"));
const index_1 = require("../index");
exports.cartRouter = (0, express_1.Router)({});
exports.cartRouter.get('/:id', (0, cors_1.default)(index_1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersCart = yield cart_service_1.cartService.findCartByUserId(+req.params.userId);
        usersCart ? res.send(usersCart) : res.send(404);
    }
    catch (error) {
        res.status(500).send("An error occurred while fetching cart");
    }
}));
/*
cartRouter.post('/', async (req: Request, res: Response) => {
    const newProductInCart
}

productsRouter.post('/', async (req: Request, res: Response) => {
        const newProduct: ProductType = await productsService.createProduct(req.body.name, req.body.price, req.body.image, req.body.userId)
        res.status(201).send(newProduct)
    })*/
