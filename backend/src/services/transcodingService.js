import fs from 'fs';
import path from 'path';

import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import RESOLUTIONS from '../utils/resolutions.js';

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const createMasterPlaylist = async (rootOutputDir) => {
  const content = ['#EXTM3U'];

  for (const resolution of RESOLUTIONS) {
    content.push(
      `#EXT-X-STREAM-INF:BANDWIDTH=${resolution.bitrate * 1000},RESOLUTION=${resolution.width}x${resolution.height}`
    );

    content.push(`${resolution.name}/playlist.m3u8`);
  }

  fs.writeFileSync(path.join(rootOutputDir, 'master.m3u8'), content.join('\n'));
};

const generateVariant = (inputPath, outputDir, resolution) => {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(outputDir, {
      recursive: true
    });

    ffmpeg(inputPath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .size(`${resolution.width}x${resolution.height}`)
      .outputOptions([
        `-b:v ${resolution.bitrate}k`,

        '-preset fast',
        '-crf 23',

        '-hls_time 6',
        '-hls_playlist_type vod',

        '-hls_segment_filename',
        path.join(outputDir, 'segment_%03d.ts')
      ])
      .output(path.join(outputDir, 'playlist.m3u8'))
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
};

export const generateAdaptiveHls = async (inputPath, videoId) => {
  const rootOutputDir = path.join(
    process.cwd(),
    'storage',
    'processed',
    videoId
  );

  fs.mkdirSync(rootOutputDir, {
    recursive: true
  });

  for (const resolution of RESOLUTIONS) {
    const variantDir = path.join(rootOutputDir, resolution.name);
    await generateVariant(inputPath, variantDir, resolution);
  }
  await createMasterPlaylist(rootOutputDir);

  return rootOutputDir;
};
