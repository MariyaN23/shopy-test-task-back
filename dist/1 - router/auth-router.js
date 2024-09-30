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
exports.authRouter = void 0;
const express_1 = require("express");
const auth_service_1 = require("../2 - service/auth-service");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const auth_middleware_1 = require("../middleware/auth-middleware");
exports.authRouter = (0, express_1.Router)({});
const usernameValidation = (0, express_validator_1.body)('username').trim().isLength({
    min: 3,
    max: 30
}).withMessage("Username should be from 3 to 30 symbols");
const passwordValidation = (0, express_validator_1.body)('password').trim().isLength({
    min: 8,
    max: 30
}).withMessage("Password should be from 8 to 30 symbols");
exports.authRouter.post('/registration', passwordValidation, usernameValidation, validation_1.validationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield auth_service_1.authService.registration(req.body.username, req.body.password);
        res.status(200).send(`New user ${newUser.username} registered`);
    }
    catch (error) {
        res.status(400).send({ message: `Registration error ${error}` });
    }
}));
exports.authRouter.post('/login', passwordValidation, usernameValidation, validation_1.validationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.authService.login(req.body.username, req.body.password);
        if (typeof result === 'object' && 'userId' in result) {
            res.cookie('token', result.token, { httpOnly: true, secure: true });
            res.status(200).json({ message: 'Token in Cookie', userId: result.userId });
        }
        else {
            res.status(400).send({ message: `Login error ${result}` });
        }
    }
    catch (error) {
        res.status(400).send({ message: `Login error ${error}` });
    }
}));
exports.authRouter.delete('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token', { httpOnly: true, secure: true });
        res.status(200).send({ message: 'Logout successfully' });
    }
    catch (error) {
        res.status(400).send({ message: `Error: ${error}` });
    }
}));
exports.authRouter.get('/users', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUsers = yield auth_service_1.authService.getUsers();
        res.send(foundUsers.map((u) => {
            return { id: u.id, username: u.username };
        }));
    }
    catch (error) {
        res.status(500).send("An error occurred while fetching users");
    }
}));
