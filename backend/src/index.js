import express from 'express';
import { PORT } from './configs/serverConfig.js';
import connectDB from './configs/dbConfig.js';

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
