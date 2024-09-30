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
exports.productsRepository = void 0;
const db_1 = require("./db");
exports.productsRepository = {
    findProduct(name_1, min_1, max_1, order_1) {
        return __awaiter(this, arguments, void 0, function* (name, min, max, order, page = '1', pageSize = '6') {
            const filter = {};
            if (name) {
                filter.name = { $regex: name, $options: 'i' };
            }
            if (min && max) {
                filter.price = { $gte: parseFloat(min), $lte: parseFloat(max) };
            }
            else if (min) {
                filter.price = { $gte: parseFloat(min) };
            }
            else if (max) {
                filter.price = { $lte: parseFloat(max) };
            }
            const sort = {};
            if (order) {
                sort.date = order === 'desc' ? -1 : 1;
            }
            const skip = (Number(page) - 1) * Number(pageSize);
            const total = yield db_1.productsCollection.countDocuments(filter);
            const products = yield db_1.productsCollection.find(filter).sort(sort).skip(skip).limit(Number(pageSize)).toArray();
            return { products, total };
        });
    },
    findProductsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield db_1.productsCollection.find({ userId }).toArray();
            return products;
        });
    },
    createProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.productsCollection.insertOne(newProduct);
            return newProduct;
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productsCollection.deleteOne({ productId: id });
            return result.deletedCount === 1;
        });
    },
    findProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield db_1.productsCollection.findOne({ productId });
            return product;
        });
    },
};
