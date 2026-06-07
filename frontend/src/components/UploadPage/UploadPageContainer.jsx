import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadPage } from './UploadPage';
import { initializeUpload } from '../../services/videoService';

export const UploadPageContainer = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleUpload = async () => {
    try {
      if (!title.trim()) {
        alert('Please provide a title.');
        return;
      }
      if (!selectedFile) {
        alert('Please select a video file.');
        return;
      }

      const { videoId, uploadUrl } = await initializeUpload({
        title,
        fileName: selectedFile.name,
        contentType: selectedFile.type,
      });

      console.log('Received from init-upload API:', { videoId, uploadUrl });

      // TODO:
      // 1. Call init-upload API
      // 2. Get presigned URL
      // 3. Upload video to S3
      // 4. Call complete-upload API

      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert('Upload Successful 🚀');
    } catch (error) {
      console.error(error);

      alert('Upload Failed');
    }
  };

  return (
    <UploadPage
      title={title}
      selectedFile={selectedFile}
      onTitleChange={handleTitleChange}
      onFileChange={handleFileChange}
      onUpload={handleUpload}
      onBack={handleBack}
    />
  );
};
