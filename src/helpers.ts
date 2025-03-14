import { IEmailLocals, winstonLogger } from '@sumaniac28/gigglobal-helper-v1';
import { config } from '@notifications/config';
import { Logger } from 'winston';
import nodemailer, { Transporter } from 'nodemailer';
import Email from 'email-templates';
import path from 'path';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransportHelper', 'debug');

async function emailTemplates(template: string, to: string, locals: IEmailLocals): Promise<void> {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: `${config.SENDER_EMAIL}`,
        pass: `${config.SENDER_EMAIL_PASSWORD}`
      }
    });

    const email: Email = new Email({
      message: {
        from: `${config.SENDER_EMAIL}`
      },
      send: true,
      preview: false,
      transport: transporter,
      views: {
        options: {
          extension: `ejs`
        }
      },
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, '../build')
        }
      }
    });

    await email.send({
      template: path.join(__dirname, '..', 'src/emails', template),
      message: {
        to: to
      },
      locals
    });
  } catch (error) {
    log.error(error);
  }
}

export { emailTemplates };
