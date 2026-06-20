import axios from '../configs/axiosConfig';

export const initializeUpload = async ({ title, fileName, contentType }) => {
  const response = await axios.post('/video/init-upload', {
    title,
    fileName,
    contentType,
  });
  return response.data;
};

export const fetchAllReadyVideos = async () => {
  const response = await axios.get('/video');
  return response.data;
};

export const fetchVideoById = async (videoId) => {
  const response = await axios.get(`/video/${videoId}`);
  return response.data;
};

export const fetchPlaybackUrl = async (videoId) => {
  const response = await axios.get(`/video/${videoId}/playback`);
  return response.data;
};

export const getVideoStatus = async (videoId) => {
  const response = await axios.get(`/video/status/${videoId}`);
  return response.data.data.status;
};
