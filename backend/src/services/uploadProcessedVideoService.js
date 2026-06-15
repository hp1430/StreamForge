import { PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { s3Client } from '../configs/s3Config.js';
import { PROCESSED_BUCKET } from '../configs/serverConfig.js';

export const uploadProcessedFiles = async (videoId, outputDir) => {
  const files = fs.readdirSync(outputDir);

  for (const file of files) {
    const filePath = path.join(outputDir, file);
    const fileContent = fs.readFileSync(filePath);

    const s3Key = `videos/${videoId}/${file}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: PROCESSED_BUCKET,
        Key: s3Key,
        Body: fileContent,
        contentType: file.endsWith('.m3u8')
          ? 'application/vnd.apple.mpegurl'
          : 'video/MP2T'
      })
    );
    console.log(`Uploaded ${file} to S3 with key: ${s3Key}`);
  }
};
