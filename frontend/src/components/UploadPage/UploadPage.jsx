export const UploadPage = ({
  title,
  selectedFile,
  isUploading,
  onTitleChange,
  onFileChange,
  onUpload,
  onBack,
}) => {
  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      <div className='max-w-3xl mx-auto px-6 py-10'>
        <button
          onClick={onBack}
          className='mb-8 text-slate-400 hover:text-white'
        >
          ← Back
        </button>

        <h1 className='text-4xl font-bold text-center mb-10'>Upload Video</h1>

        <div className='space-y-6'>
          <div>
            <label className='block mb-2 text-sm text-slate-300'>Title</label>

            <input
              type='text'
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder='Enter video title'
              className='w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500'
            />
          </div>

          <div>
            <label className='block mb-2 text-sm text-slate-300'>
              Select Video
            </label>

            <label className='flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-900 hover:border-blue-500 transition'>
              <span className='text-5xl mb-3'>📹</span>

              <span className='text-lg font-medium'>
                {selectedFile ? selectedFile.name : 'Choose Video File'}
              </span>

              <span className='mt-2 text-sm text-slate-400'>MP4, MOV, MKV</span>

              <input
                type='file'
                accept='video/*'
                className='hidden'
                onChange={(e) => onFileChange(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div className='flex justify-center'>
            <button
              onClick={onUpload}
              disabled={!title || !selectedFile || isUploading}
              className='rounded-lg bg-blue-600 px-8 py-3 font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700'
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
