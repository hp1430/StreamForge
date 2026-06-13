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

      if (!videoId || !uploadUrl) {
        alert('Failed to initialize upload. Please try again.');
        return;
      }

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Content-Type': selectedFile.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload video to S3');
      }

      console.log('Video uploaded to S3 successfully');

      // TODO:
      // 1. Call init-upload API
      // 2. Get presigned URL
      // 3. Upload video to S3
      // 4. Call complete-upload API

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
