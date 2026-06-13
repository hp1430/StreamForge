import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadPage } from './UploadPage';
import { initializeUpload } from '../../services/videoService';
import { toast } from 'sonner';

export const UploadPageContainer = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
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
        toast.error('Please enter a title for the video.');
        return;
      }
      if (!selectedFile) {
        toast.error('Please select a video file.');
        return;
      }

      const { videoId, uploadUrl } = await initializeUpload({
        title,
        fileName: selectedFile.name,
        contentType: selectedFile.type,
      });

      if (!videoId || !uploadUrl) {
        toast.error('Failed to initialize upload. Please try again.');
        return;
      }

      setIsUploading(true);

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

      setIsUploading(false);

      // TODO:
      // 1. Call init-upload API
      // 2. Get presigned URL
      // 3. Upload video to S3
      // 4. Call complete-upload API

      toast.success('Upload Successful 🚀');
    } catch (error) {
      console.error(error);

      toast.error('Upload Failed');
    }
  };

  return (
    <UploadPage
      title={title}
      selectedFile={selectedFile}
      isUploading={isUploading}
      onTitleChange={handleTitleChange}
      onFileChange={handleFileChange}
      onUpload={handleUpload}
      onBack={handleBack}
    />
  );
};
