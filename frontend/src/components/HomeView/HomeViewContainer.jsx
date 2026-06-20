import { useNavigate } from 'react-router-dom';
import { HomeView } from './HomeView';
import { useEffect, useState } from 'react';
import {
  fetchAllReadyVideos,
  getVideoStatus,
} from '../../services/videoService';

const HomeContainer = () => {
  const [videos, setVideos] = useState([]);
  const [processingVideos, setProcessingVideos] = useState([]);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  const fetchVideos = async () => {
    const videos = await fetchAllReadyVideos();
    setVideos(videos?.data || []);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    const pollVideoStatuses = async () => {
      try {
        const myUploads = JSON.parse(localStorage.getItem('myUploads')) || [];

        if (!myUploads.length) {
          setProcessingVideos([]);
          return;
        }

        const statusResponses = await Promise.all(
          myUploads.map((videoId) => getVideoStatus(videoId))
        );

        const activeVideos = statusResponses.filter(
          (video) => video.status !== 'READY'
        );

        setProcessingVideos(activeVideos);

        const readyVideoIds = statusResponses
          .filter((video) => video.status === 'READY')
          .map((video) => video.id);

        if (readyVideoIds.length) {
          const updatedUploads = myUploads.filter(
            (id) => !readyVideoIds.includes(id)
          );

          localStorage.setItem('myUploads', JSON.stringify(updatedUploads));

          fetchVideos();
        }
      } catch (error) {
        console.error(error);
      }
    };

    pollVideoStatuses();

    const interval = setInterval(pollVideoStatuses, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HomeView
        onUploadClick={handleUploadClick}
        videos={videos}
        processingVideos={processingVideos}
      />
    </>
  );
};

export default HomeContainer;
