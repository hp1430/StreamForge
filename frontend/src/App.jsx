import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeContainer from './components/HomeView/HomeViewContainer';
import { UploadPageContainer } from './components/UploadPage/UploadPageContainer';
import { VideoPlayerPageContainer } from './components/VideoPlayerPage/VideoPlayerPageContainer';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position='top-right' richColors theme='dark' />
      <Routes>
        <Route path='/' element={<HomeContainer />} />
        <Route path='/upload' element={<UploadPageContainer />} />
        <Route path='/video/:id' element={<VideoPlayerPageContainer />} />
      </Routes>
    </>
  );
}

export default App;
