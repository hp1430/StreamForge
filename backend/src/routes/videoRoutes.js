import express from 'express';
import { initUpload } from '../controllers/videoController.js';

const router = express.Router();

router.post('/init-upload', initUpload);

export default router;