"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../repository/config"));
const verifyToken = (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).json({ error: "No cookie" });
    }
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const decodedData = jsonwebtoken_1.default.verify(token, config_1.default.secret);
    next();
};
exports.verifyToken = verifyToken;
