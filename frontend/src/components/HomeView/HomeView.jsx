export const HomeView = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-white">
          StreamForge
        </h1>

        <p className="text-slate-400 text-lg">
          Adaptive Video Streaming Platform
        </p>

        <button
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Upload Video
        </button>
      </div>
    </div>
  );
};