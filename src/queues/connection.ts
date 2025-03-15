import { config } from '@notifications/config';
import { winstonLogger } from '@sumaniac28/gigglobal-helper-v1';
import client, { Channel, Connection } from 'amqplib';
import { Logger } from 'winston';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'notificationQueueConnection',
  'debug',
  `${config.KIBANA_DASH_USERNAME}`,
  `${config.KIBANA_DASH_PASSWORD}`
);

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection: Connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    log.info('Notification server connected to queue successfully');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'Notification service createConnection() method: ', error);
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: Connection): void {
  process.once('SIGNINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };
