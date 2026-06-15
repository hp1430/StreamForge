import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const MONGO_URL = process.env.MONGO_URL;

export const AWS_REGION = process.env.AWS_REGION;

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;

export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

export const RAW_BUCKET = process.env.RAW_BUCKET;

export const PROCESSED_BUCKET = process.env.PROCESSED_BUCKET;

export const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

export const SQS_PROCESSING_QUEUE_URL = process.env.SQS_PROCESSING_QUEUE_URL;
