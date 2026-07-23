"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    motto: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 0 },
    weeklyPoints: { type: Number, required: true, min: 0 }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Team', teamSchema);
