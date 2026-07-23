"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const app_1 = require("./app");
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const app = (0, app_1.createApp)(baseUrl);
(0, database_1.connectDatabase)().then(() => {
    app.listen(app_1.PORT, () => {
        console.log(`Octofit backend listening at ${baseUrl}`);
    });
});
