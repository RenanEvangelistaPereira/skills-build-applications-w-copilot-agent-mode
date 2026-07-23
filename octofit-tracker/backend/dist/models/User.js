"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    fitnessGoal: { type: String, required: true, trim: true },
    weeklyActivityMinutes: { type: Number, required: true, min: 0 }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
