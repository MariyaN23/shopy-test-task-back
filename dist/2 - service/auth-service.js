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
exports.authService = void 0;
const auth_repository_1 = require("../3 - repository/auth-repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.authService = {
    registration(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = bcrypt_1.default.hashSync(password, 7);
            const userId = +new Date();
            const createdUser = yield auth_repository_1.authRepository.registerUser(userId, username, hashedPassword);
            return createdUser;
        });
    },
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield auth_repository_1.authRepository.loginUser(username, password);
            return res;
        });
    },
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return auth_repository_1.authRepository.getUsers();
        });
    },
};
