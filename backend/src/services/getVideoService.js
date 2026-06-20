import {
  getAllReadyVideos,
  getVideoById,
  getVideoStatusById
} from '../repositories/videoRepository.js';
import { PROCESSED_BUCKET, AWS_REGION } from '../configs/serverConfig.js';

export const fetchAllVideosService = async () => {
  const videos = await getAllReadyVideos();
  if (!videos || videos.length === 0) {
    throw new Error('No ready videos found');
  }

  const formattedVideos = videos.map((video) => ({
    id: video._id,
    title: video.title,
    status: video.status
  }));

  return formattedVideos;
};

export const fetchVideoByIdService = async (videoId) => {
  if (!videoId) {
    throw new Error('Video ID is required');
  }
  const video = await getVideoById(videoId);
  if (!video) {
    throw new Error('Video not found');
  }
  return video;
};

export const getPlaybackUrlService = async (videoId) => {
  const video = await getVideoById(videoId);
  if (!video) {
    throw new Error('Video not found');
  }

  if (video.status !== 'READY') {
    throw new Error('Video is not ready for playback');
  }

  return {
    playbackUrl: `https://${PROCESSED_BUCKET}.s3.${AWS_REGION}.amazonaws.com/videos/${videoId}/master.m3u8`
  };
};

export const getVideoStatusService = async (videoId) => {
  const videoStatus = await getVideoStatusById(videoId);
  if (!videoStatus) {
    throw new Error('Video not found');
  }
  return videoStatus;
};
