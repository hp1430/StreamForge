import { initializeVideoUpload } from '../services/videoService.js';

export const initUpload = async (req, res) => {
  try {
    const { title, fileName, contentType } = req.body;

    if (!title || !fileName || !contentType) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    const result = await initializeVideoUpload({
      title,
      fileName,
      contentType
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Upload initialization failed'
    });
  }
};
