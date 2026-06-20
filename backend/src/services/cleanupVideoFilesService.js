import fs from 'fs';

export const cleanupVideoFilesService = (rawFilePath, processedDir) => {
  try {
    if (fs.existsSync(rawFilePath)) {
      fs.unlinkSync(rawFilePath);
    }

    if (fs.existsSync(processedDir)) {
      fs.rmSync(processedDir, {
        recursive: true,
        force: true
      });
    }
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
};
