import { config } from '@notifications/config';
import { emailTemplates } from '@notifications/helpers';
import { IEmailLocals, winstonLogger } from '@sumaniac28/gigglobal-helper-v1';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransport', 'debug');

async function sendEmail(template: string, recieverEmail: string, locals: IEmailLocals): Promise<void> {
  try {
    emailTemplates(template, recieverEmail, locals);
    log.info('Email sent successfully');
  } catch (error) {
    log.log('error', 'NotificationService MailTransport sendEmail() method error: ', error);
  }
}

export { sendEmail };
