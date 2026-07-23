import { connectDatabase } from './config/database';
import { createApp, PORT } from './app';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = createApp(baseUrl);

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Octofit backend listening at ${baseUrl}`);
  });
});
