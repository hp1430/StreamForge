import { useNavigate } from 'react-router-dom';
import { HomeView } from './HomeView';

const HomeContainer = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return <HomeView onUploadClick={handleUploadClick} />;
};

export default HomeContainer;
