import express from 'express';
import { PORT } from './configs/serverConfig.js';
import connectDB from './configs/dbConfig.js';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes.js';
import { startIngestionWorker } from './workers/ingestionWorker.js';
import { startTranscodingWorker } from './workers/transcodingWorker.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/video', videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
  startIngestionWorker();
  startTranscodingWorker();
});
