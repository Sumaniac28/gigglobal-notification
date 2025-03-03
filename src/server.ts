import { winstonLogger } from '@sumaniac28/gigglobal-helper';
import 'express-async-errors';
import http from 'http';
import { Logger } from 'winston';
import { config } from '@notifications/config';
import { Application } from 'express';
import { healthRoutes } from '@notifications/routes';
import { checkConnection } from '@notifications/elasticsearch';
import { createConnection } from '@notifications/queues/connection';
import { Channel } from 'amqplib';
import { consumeAuthEmailMessages, consumeOrderEmailMessages } from '@notifications/queues/email.cosumer';

const SERVER_PORT = 4001;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

export function start(app: Application): void {
  startServer(app);
  app.use('', healthRoutes());
  startQueues();
  startElasticSearch();
}

async function startQueues(): Promise<void> {
  const emailChannel = (await createConnection()) as Channel;
  await consumeAuthEmailMessages(emailChannel);
  await consumeOrderEmailMessages(emailChannel);
  // const verificationLik = `${config.CLIENT_URL}/confirm_email?v_token=12341234jljodwswe`;
  // const messageDetails: IEmailMessageDetails = {
  //   receiverEmail: `${config.SENDER_EMAIL}`,
  //   verifyLink: verificationLik,
  //   template: 'verifyEmail'
  // };
  // await emailChannel.assertExchange('GigGlobal-email-notification', 'direct');
  // const message = JSON.stringify(messageDetails);
  // emailChannel.publish('GigGlobal-email-notification', 'auth-email', Buffer.from(message));
}

function startElasticSearch(): void {
  checkConnection();
}

function startServer(app: Application) {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`Worker with a process id of ${process.pid} on notification server has started`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification Server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', 'NotificationService startServer() method: ', error);
  }
}
