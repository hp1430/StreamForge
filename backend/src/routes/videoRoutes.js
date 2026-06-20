import express from 'express';
import { initUpload } from '../controllers/videoController.js';
import {
  getAllReadyVideos,
  getVideoById,
  getPlaybackUrl,
  getVideoStatus
} from '../controllers/getVideoController.js';

const router = express.Router();

router.post('/init-upload', initUpload);
router.get('/', getAllReadyVideos);
router.get('/status/:id', getVideoStatus);
router.get('/:id/playback', getPlaybackUrl);
router.get('/:id', getVideoById);

export default router;
