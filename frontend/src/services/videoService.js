import axios from '../configs/axiosConfig';

export const initializeUpload = async ({ title, fileName, contentType }) => {
  const response = await axios.post('/video/init-upload', {
    title,
    fileName,
    contentType,
  });
  return response.data;
};
