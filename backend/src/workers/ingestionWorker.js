import {
  ReceiveMessageCommand,
  DeleteMessageCommand
} from '@aws-sdk/client-sqs';
import { sqsClient } from '../configs/sqsConfig.js';
import { SQS_QUEUE_URL } from '../configs/serverConfig.js';
import Video from '../schemas/videoSchema.js';
import { enqueueVideoForProcessing } from '../services/processingQueueService.js';

export const startIngestionWorker = async () => {
  while (true) {
    try {
      const response = await sqsClient.send(
        new ReceiveMessageCommand({
          QueueUrl: SQS_QUEUE_URL,
          MaxNumberOfMessages: 10,
          WaitTimeSeconds: 20
        })
      );

      const messages = response.Messages || [];

      for (const message of messages) {
        const body = JSON.parse(message.Body);
        const record = body.Records[0];
        const key = decodeURIComponent(
          record.s3.object.key.replace(/\+/g, ' ')
        );

        await sqsClient.send(
          new DeleteMessageCommand({
            QueueUrl: SQS_QUEUE_URL,
            ReceiptHandle: message.ReceiptHandle
          })
        );

        const video = await Video.findOneAndUpdate(
          {
            originalVideoKey: key
          },
          {
            status: 'UPLOADED'
          },
          {
            returnDocument: 'after'
          }
        );

        if (video) {
          await enqueueVideoForProcessing({
            videoId: video._id,
            key: video.originalVideoKey
          });
        }
      }
    } catch (error) {
      console.error('Error in ingestion worker:', error);
    }
  }
};
