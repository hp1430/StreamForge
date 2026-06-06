import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import Video from '../schemas/videoSchema.js';
import { s3Client } from '../configs/s3Config.js';
import { RAW_BUCKET } from '../configs/serverConfig.js';

export const initializeVideoUpload = async ({
  title,
  fileName,
  contentType
}) => {
  const key = `raw-videos/${Date.now()}-${fileName}`;

  const video = await Video.create({
    title,
    originalVideoKey: key
  });

  const command = new PutObjectCommand({
    Bucket: RAW_BUCKET,
    Key: key,
    ContentType: contentType
  });

  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600
  });

  return {
    videoId: video._id,
    uploadUrl,
    key
  };
};
