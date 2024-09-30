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
exports.productsRouter = void 0;
const express_1 = require("express");
const products_service_1 = require("../2 - service/products-service");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const index_1 = require("../index");
const cors_1 = __importDefault(require("cors"));
exports.productsRouter = (0, express_1.Router)({});
const productNameValidation = (0, express_validator_1.body)('name').trim().isLength({
    min: 3,
    max: 30
}).withMessage("Product name should be from 3 to 30 symbols");
const priceValidation = (0, express_validator_1.body)('price').trim().isFloat({
    min: 1,
    max: 10000
}).withMessage("Price should be from 1 to 10 000 $");
exports.productsRouter.get('/', (0, cors_1.default)(index_1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const response = yield products_service_1.productsService.findProduct((_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString(), (_b = req.query.min) === null || _b === void 0 ? void 0 : _b.toString(), (_c = req.query.max) === null || _c === void 0 ? void 0 : _c.toString(), (_d = req.query.order) === null || _d === void 0 ? void 0 : _d.toString(), (_e = req.query.page) === null || _e === void 0 ? void 0 : _e.toString(), (_f = req.query.pageSize) === null || _f === void 0 ? void 0 : _f.toString());
    res.send(response);
}));
exports.productsRouter.get('/:id', (0, cors_1.default)(index_1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProducts = yield products_service_1.productsService.findProductsByUserId(+req.params.id);
    foundProducts ? res.send(foundProducts) : res.send(404);
}));
exports.productsRouter.post('/', productNameValidation, priceValidation, validation_1.validationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield products_service_1.productsService.createProduct(req.body.name, req.body.price, req.body.image, req.body.userId);
    res.status(201).send(newProduct);
}));
exports.productsRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield products_service_1.productsService.deleteProduct(+req.params.id);
    isDeleted ? res.send(204) : res.send(404);
}));
exports.productsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_service_1.productsService.findProductById(+req.params.id);
    product ? res.send(product) : res.send(404);
}));
