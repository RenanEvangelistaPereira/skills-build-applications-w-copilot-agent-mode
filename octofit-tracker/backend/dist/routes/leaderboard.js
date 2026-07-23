"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const data = await LeaderboardEntry_1.default.find().sort({ rank: 1 });
        res.json({ collection: 'leaderboard', data });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch leaderboard', error });
    }
});
exports.default = router;
