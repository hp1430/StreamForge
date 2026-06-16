import { useNavigate } from 'react-router-dom';
import { HomeView } from './HomeView';
import { useEffect, useState } from 'react';
import { fetchAllReadyVideos } from '../../services/videoService';

const HomeContainer = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await fetchAllReadyVideos();
      setVideos(videos?.data || []);
      console.log('Fetched videos:', videos?.data || []);
    };
    fetchVideos();
  }, []);

  return <HomeView onUploadClick={handleUploadClick} videos={videos} />;
};

export default HomeContainer;
