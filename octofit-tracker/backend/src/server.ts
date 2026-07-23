import express from 'express';
import { connectDatabase } from './config/database';

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port: PORT,
    baseUrl,
    database: 'mongodb://localhost:27017/octofit_db'
  });
});

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Octofit backend listening at ${baseUrl}`);
  });
});
