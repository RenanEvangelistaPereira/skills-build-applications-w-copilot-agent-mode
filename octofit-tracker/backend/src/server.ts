import { connectDatabase } from './config/database';
import { createApp, getBaseUrl, PORT } from './app';

const app = createApp();

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Octofit backend listening at ${getBaseUrl()}`);
  });
});
