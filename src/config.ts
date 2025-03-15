import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public RABBITMQ_ENDPOINT: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_EMAIL_PASSWORD: string | undefined;
  public ELASTIC_SEARCH_URL: string | undefined;
  public ELASTIC_SEARCH_USERNAME: string;
  public ELASTIC_SEARCH_PASSWORD: string;
  public KIBANA_DASH_USERNAME: string | undefined;
  public KIBANA_DASH_PASSWORD: string | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.SENDER_EMAIL = process.env.SENDER_EMAIL || '';
    this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT || '';
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
    this.ELASTIC_SEARCH_USERNAME = process.env.ELASTIC_SEARCH_USERNAME || '';
    this.ELASTIC_SEARCH_PASSWORD = process.env.ELASTIC_SEARCH_PASSWORD || '';
    this.KIBANA_DASH_USERNAME = process.env.KIBANA_DASH_USERNAME || '';
    this.KIBANA_DASH_PASSWORD = process.env.KIBANA_DASH_PASSWORD || '';
  }
}

export const config: Config = new Config();
