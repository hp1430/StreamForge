import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { SQS_PROCESSING_QUEUE_URL } from '../configs/serverConfig.js';
import { sqsClient } from '../configs/sqsConfig.js';

export const enqueueVideoForProcessing = async ({ videoId, key }) => {
  await sqsClient.send(
    new SendMessageCommand({
      QueueUrl: SQS_PROCESSING_QUEUE_URL,
      MessageBody: JSON.stringify({
        videoId,
        key
      })
    })
  );
};
