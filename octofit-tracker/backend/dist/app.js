"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
exports.PORT = 8000;
function createApp(baseUrl) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/api/users', users_1.default);
    app.use('/api/teams', teams_1.default);
    app.use('/api/activities', activities_1.default);
    app.use('/api/leaderboard', leaderboard_1.default);
    app.use('/api/workouts', workouts_1.default);
    app.get('/api/health', (_req, res) => {
        res.json({
            status: 'ok',
            service: 'octofit-backend',
            port: exports.PORT,
            baseUrl,
            database: 'mongodb://localhost:27017/octofit_db'
        });
    });
    return app;
}
