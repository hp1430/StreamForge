import fs from 'fs';
import path from 'path';

import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);

export const generate720pHls = async (inputPath, videoId) => {
  const outputDir = path.join(process.cwd(), 'storage', 'processed', videoId);

  fs.mkdirSync(outputDir, {
    recursive: true
  });

  const playlistPath = path.join(outputDir, 'playlist.m3u8');

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .size('?x720')
      .outputOptions([
        '-preset fast',
        '-crf 23',

        '-hls_time 6',
        '-hls_playlist_type vod',

        '-hls_segment_filename',
        path.join(outputDir, 'segment_%03d.ts')
      ])
      .output(playlistPath)
      .on('end', () => {
        console.log('720p HLS generated');

        resolve({
          outputDir,
          playlistPath
        });
      })
      .on('error', reject)
      .run();
  });
};
