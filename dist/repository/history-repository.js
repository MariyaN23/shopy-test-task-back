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
exports.historyRepository = void 0;
const db_1 = require("./db");
exports.historyRepository = {
    findHistoryByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const history = yield db_1.historyCollection.findOne({ userId });
            if (history) {
                return history;
            }
            else {
                const addHistory = {
                    userId,
                    itemsInHistory: []
                };
                yield db_1.historyCollection.insertOne(addHistory);
                return addHistory;
            }
        });
    },
    addToHistory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield db_1.cartsCollection.findOne({ userId });
            let newHistory;
            let newHistoryAll;
            if (cart) {
                const date = new Date();
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const addedDate = `${day}.${month}.${year}`;
                newHistory = cart.itemsInCart.map(el => ({
                    productId: el.productId,
                    name: el.name,
                    price: el.price,
                    dateOfBuy: addedDate,
                    image: el.image
                }));
                const itemsWhoWasInHistory = yield db_1.historyCollection.findOne({ userId });
                if (itemsWhoWasInHistory) {
                    newHistoryAll = newHistory.concat(itemsWhoWasInHistory.itemsInHistory);
                }
            }
            if (newHistoryAll) {
                const addToUsersHistory = yield db_1.historyCollection.updateOne({ userId }, { $set: { itemsInHistory: newHistoryAll } });
                if (addToUsersHistory) {
                    return `History updated successfully!`;
                }
                else {
                    return `Failed to update`;
                }
            }
            return `Failed to add in history`;
        });
    },
};
