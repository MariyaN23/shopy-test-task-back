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
exports.historyRouter = void 0;
const express_1 = require("express");
const history_service_1 = require("../service/history-service");
const cors_1 = __importDefault(require("cors"));
const index_1 = require("../index");
exports.historyRouter = (0, express_1.Router)({});
exports.historyRouter.get('/:userId', (0, cors_1.default)(index_1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersHistory = yield history_service_1.historyService.findHistoryByUserId(+req.params.userId);
        usersHistory ? res.status(200).send(usersHistory) : res.status(404).send(`History not found`);
    }
    catch (error) {
        res.status(500).send("An error occurred while fetching history");
    }
}));
exports.historyRouter.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield history_service_1.historyService.addToHistory(+req.params.id);
    res.status(200).send(result);
}));
