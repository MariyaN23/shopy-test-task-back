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
exports.productsService = void 0;
const products_repository_1 = require("../repository/products-repository");
exports.productsService = {
    findProduct(name_1, min_1, max_1, order_1) {
        return __awaiter(this, arguments, void 0, function* (name, min, max, order, page = '1', pageSize = '6') {
            const search = yield products_repository_1.productsRepository.findProduct(name, min, max, order, page, pageSize);
            return search;
        });
    },
    findProductsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return products_repository_1.productsRepository.findProductsByUserId(userId);
        });
    },
    createProduct(name, price, image, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const addedDate = `${day}.${month}.${year}`;
            const newProduct = {
                productId: +date,
                name,
                price: Number(price),
                date: addedDate,
                status: 'On sale',
                userId: Number(userId),
                image
            };
            const createdProduct = yield products_repository_1.productsRepository.createProduct(newProduct);
            return createdProduct;
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_repository_1.productsRepository.deleteProduct(id);
        });
    },
    findProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return products_repository_1.productsRepository.findProductById(id);
        });
    },
};
