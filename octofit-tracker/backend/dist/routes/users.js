"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const data = await User_1.default.find().sort({ displayName: 1 });
        res.json({ collection: 'users', data });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch users', error });
    }
});
exports.default = router;
