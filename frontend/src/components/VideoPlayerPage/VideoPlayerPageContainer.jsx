import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { VideoPlayerPage } from './VideoPlayerPage';
import { fetchPlaybackUrl } from '../../services/videoService';

export const VideoPlayerPageContainer = () => {
  const { id } = useParams();

  const [playbackUrl, setPlaybackUrl] = useState('');

  useEffect(() => {
    const getPlaybackUrl = async () => {
      try {
        const response = await fetchPlaybackUrl(id);

        setPlaybackUrl(response?.data?.playbackUrl || '');

        console.log('Fetched playback URL:', response?.data?.playbackUrl || '');
      } catch (error) {
        console.error(error);
      }
    };

    getPlaybackUrl();
  }, [id]);

  return <VideoPlayerPage playbackUrl={playbackUrl} />;
};
