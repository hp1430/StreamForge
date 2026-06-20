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

export const getVideoStatusById = async (videoId) => {
  const video = await Video.findById(videoId).select('title status');
  if (!video) {
    throw new Error('Video not found');
  }
  return video;
};
