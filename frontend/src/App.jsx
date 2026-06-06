import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeContainer from './components/HomeView/HomeViewContainer';
import { UploadPageContainer } from './components/UploadPage/UploadPageContainer';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeContainer />} />
      <Route path='/upload' element={<UploadPageContainer />} />
    </Routes>
  );
}

export default App;
