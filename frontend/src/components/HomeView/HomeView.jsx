import { ProcessingStatus } from '../ProcessingStatus/ProcessingStatus';
import { VideoGrid } from '../VideoGrid/VideoGrid';
import logo from '../../assets/logo1.PNG';

export const HomeView = ({ onUploadClick, videos, processingVideos }) => {
  return (
    <div className='min-h-screen bg-slate-950'>
      <header className='border-b border-slate-800'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
          <div>
            <img 
              className='h-20 w-auto'
              src={logo} 
            />
          </div>

          <ProcessingStatus videos={processingVideos} />

          <button
            onClick={onUploadClick}
            className='
              rounded-lg
              bg-blue-600
              px-5
              py-2.5
              font-medium
              text-white
              transition
              hover:bg-blue-700
            '
          >
            Upload Video
          </button>
        </div>
      </header>

      <main className='mx-auto max-w-7xl px-6 py-8'>
        {videos.length === 0 ? (
          <div className='flex h-[60vh] items-center justify-center'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold text-white'>
                No Videos Yet
              </h2>

              <p className='mt-2 text-slate-400'>
                Upload your first video to get started.
              </p>
            </div>
          </div>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </main>
    </div>
  );
};
