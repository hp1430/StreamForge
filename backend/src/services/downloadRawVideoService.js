import fs from 'fs';
import path from 'path';

import { GetObjectCommand } from '@aws-sdk/client-s3';

import { s3Client } from '../configs/s3Config.js';
import { RAW_BUCKET } from '../configs/serverConfig.js';

export const downloadRawVideo = async (key, videoId) => {
  const localFilePath = path.join(
    process.cwd(),
    'storage',
    'raw',
    `${videoId}.mp4`
  );

  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: RAW_BUCKET,
      Key: key
    })
  );

  const writeStream = fs.createWriteStream(localFilePath);

  await new Promise((resolve, reject) => {
    response.Body.pipe(writeStream);

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  return localFilePath;
};
