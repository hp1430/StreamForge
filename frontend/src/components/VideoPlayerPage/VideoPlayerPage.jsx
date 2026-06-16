import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export const VideoPlayerPage = ({ playbackUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!playbackUrl) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(playbackUrl);

      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = playbackUrl;
    }
  }, [playbackUrl]);

  return (
    <div className='min-h-screen bg-slate-950 p-6'>
      <div className='mx-auto max-w-6xl'>
        <video
          ref={videoRef}
          controls
          className='
            w-full
            rounded-xl
            bg-black
          '
        />
      </div>
    </div>
  );
};
