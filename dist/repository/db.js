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
exports.runDb = exports.historyCollection = exports.cartsCollection = exports.usersCollection = exports.productsCollection = exports.client = void 0;
const mongodb_1 = require("mongodb");
//const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"
const mongoUri = "mongodb+srv://sellaite505:kdHZ0qno92Q7s5P2@shopy-test-task.in5tj.mongodb.net/?retryWrites=true&w=majority&appName=shopy-test-task";
//export const client = new MongoClient(mongoUri)
/*export const client = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});*/
exports.client = new mongodb_1.MongoClient(mongoUri);
const db = exports.client.db("Shopy");
exports.productsCollection = db.collection("products");
exports.usersCollection = db.collection("users");
exports.cartsCollection = db.collection("carts");
exports.historyCollection = db.collection("history");
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        yield exports.client.db("products").command({ ping: 1 });
        console.log("Connected successfully to mongo server");
    }
    catch (_a) {
        yield exports.client.close();
        console.log("Can't connect to DB");
    }
});
exports.runDb = runDb;
