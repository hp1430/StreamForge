import { useNavigate } from 'react-router-dom';
import { VideoCard } from './VideoCard';

export const VideoCardContainer = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate(`/video/${video.id}`);
  };

  return <VideoCard title={video.title} onClick={handleClick} />;
};
