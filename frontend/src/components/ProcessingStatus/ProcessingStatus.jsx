import { Loader2, Video } from 'lucide-react';

export const ProcessingStatus = ({ videos }) => {
  if (!videos?.length) {
    return null;
  }

  return (
    <div
      className='
        fixed
        top-4
        right-4
        z-50
        w-96
        space-y-3
      '
    >
      {videos.map((video) => (
        <div
          key={video.id}
          className='
            rounded-xl
            border
            border-slate-700
            bg-slate-900/95
            p-4
            shadow-xl
            backdrop-blur
          '
        >
          <div className='flex items-start gap-3'>
            <div
              className='
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                bg-blue-600/20
              '
            >
              <Video size={18} className='text-blue-400' />
            </div>

            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <Loader2
                  size={14}
                  className='
                    animate-spin
                    text-blue-400
                  '
                />

                <span
                  className='
                    text-sm
                    font-medium
                    text-blue-400
                  '
                >
                  Processing
                </span>
              </div>

              <p
                className='
                  mt-2
                  truncate
                  text-sm
                  font-medium
                  text-white
                '
              >
                {video.title}
              </p>

              <p
                className='
                  mt-1
                  text-xs
                  text-slate-400
                '
              >
                Creating adaptive streams...
              </p>

              <div
                className='
                  mt-3
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-slate-800
                '
              >
                <div
                  className='
                    h-full
                    w-full
                    animate-pulse
                    rounded-full
                    bg-blue-500
                  '
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
