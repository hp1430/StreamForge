import fs from 'fs';
import path from 'path';

import { PutObjectCommand } from '@aws-sdk/client-s3';

import { s3Client } from '../configs/s3Config.js';
import { PROCESSED_BUCKET } from '../configs/serverConfig.js';

const getContentType = (fileName) => {
  if (fileName.endsWith('.m3u8')) {
    return 'application/vnd.apple.mpegurl';
  }

  if (fileName.endsWith('.ts')) {
    return 'video/mp2t';
  }

  return 'application/octet-stream';
};

const uploadDirectory = async (localDir, s3Prefix) => {
  const entries = fs.readdirSync(localDir, {
    withFileTypes: true
  });

  for (const entry of entries) {
    const fullPath = path.join(localDir, entry.name);

    const s3Key = `${s3Prefix}/${entry.name}`;

    if (entry.isDirectory()) {
      await uploadDirectory(fullPath, s3Key);

      continue;
    }

    const fileContent = fs.readFileSync(fullPath);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: PROCESSED_BUCKET,
        Key: s3Key,
        Body: fileContent,
        ContentType: getContentType(entry.name)
      })
    );
  }
};

export const uploadProcessedFiles = async (videoId, outputDir) => {
  await uploadDirectory(outputDir, `videos/${videoId}`);
};
