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
exports.corsOptions = void 0;
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./router/products-router");
const db_1 = require("./repository/db");
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = require("./router/auth-router");
const stripe_1 = require("./router/stripe");
const cart_router_1 = require("./router/cart-router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const history_router_1 = require("./router/history-router");
const app = (0, express_1.default)();
exports.corsOptions = {
    //origin: ['http://localhost:3000', 'https://shopy-test-task.onrender.com'],
    origin: 'https://shopy-test-task.onrender.com',
    credentials: true,
};
app.use((0, cors_1.default)(exports.corsOptions));
app.use((0, cookie_parser_1.default)());
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use('/products', products_router_1.productsRouter);
app.use('/auth', auth_router_1.authRouter);
app.use('/stripe', stripe_1.stripeRouter);
app.use('/cart', cart_router_1.cartRouter);
app.use('/history', history_router_1.historyRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
