"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user = new mongoose_1.Schema({
    username: { type: 'string', unique: true, required: true },
    password: { type: 'string', required: true },
});
