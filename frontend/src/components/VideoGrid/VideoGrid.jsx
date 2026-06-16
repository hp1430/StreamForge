import { VideoCardContainer } from '../VideoCard/VideoCardContainer';

export const VideoGrid = ({ videos }) => {
  return (
    <div
      className='
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      '
    >
      {videos.map((video) => (
        <VideoCardContainer key={video.id} video={video} />
      ))}
    </div>
  );
};
