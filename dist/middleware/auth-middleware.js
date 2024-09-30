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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../repository/config"));
const db_1 = require("../repository/db");
const mongodb_1 = require("mongodb");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const decodedData = jsonwebtoken_1.default.verify(token, config_1.default.secret);
        req.user = yield db_1.usersCollection.findOne({ _id: new mongodb_1.ObjectId(decodedData.id) });
        next();
    }
    catch (error) {
        return res.status(403).send(`Error ${error}`);
    }
});
exports.authMiddleware = authMiddleware;
