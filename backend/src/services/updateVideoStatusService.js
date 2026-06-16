import Video from '../schemas/videoSchema.js';

export const updateVideoStatusService = async (videoId, status) => {
  return Video.findByIdAndUpdate(
    videoId,
    {
      status
    },
    {
      returnDocument: 'after'
    }
  );
};
