import { sqsClient } from '../configs/sqsConfig.js';
import {
  ReceiveMessageCommand,
  DeleteMessageCommand
} from '@aws-sdk/client-sqs';
import { SQS_PROCESSING_QUEUE_URL } from '../configs/serverConfig.js';
import { downloadRawVideo } from '../services/downloadRawVideoService.js';
import path from 'path';
import { generateAdaptiveHls } from '../services/transcodingService.js';
import { uploadProcessedFiles } from '../services/uploadProcessedVideoService.js';

export const startTranscodingWorker = async () => {
  while (true) {
    try {
      const response = await sqsClient.send(
        new ReceiveMessageCommand({
          QueueUrl: SQS_PROCESSING_QUEUE_URL,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 20
        })
      );

      const messages = response.Messages || [];

      for (const message of messages) {
        const payload = JSON.parse(message.Body);
        const { key, videoId } = payload;

        const localFilePath = await downloadRawVideo(key, videoId);

        const outputDir = await generateAdaptiveHls(localFilePath, videoId);

        await uploadProcessedFiles(videoId, outputDir);

        await sqsClient.send(
          new DeleteMessageCommand({
            QueueUrl: SQS_PROCESSING_QUEUE_URL,
            ReceiptHandle: message.ReceiptHandle
          })
        );
      }
    } catch (error) {
      console.error('Error in transcoding worker:', error);
    }
  }
};
