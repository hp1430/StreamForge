import Video from '../schemas/videoSchema.js';

export const getAllReadyVideos = async () => {
  return Video.find({
    status: 'READY'
  }).sort({ createdAt: -1 });
};

export const getVideoById = async (videoId) => {
  return Video.findById(videoId, {
    status: 'READY'
  });
};
