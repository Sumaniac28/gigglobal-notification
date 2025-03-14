import { Client } from '@elastic/elasticsearch';
import { ClusterHealthHealthResponseBody } from '@elastic/elasticsearch/lib/api/types';
import { config } from '@notifications/config';
import { winstonLogger } from '@sumaniac28/gigglobal-helper-v1';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationElasticSearchServer', 'debug');
const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`,
  auth: {
    username: config.ELASTIC_SEARCH_USERNAME, 
    password: config.ELASTIC_SEARCH_PASSWORD, 
  },
});

export async function checkConnection(): Promise<void> {
  let isConnected = false;
  while (!isConnected) {
    try {
      const health: ClusterHealthHealthResponseBody = await elasticSearchClient.cluster.health({});
      log.info(`NotificationService Elasticsearch  health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to elasticsearch failed. Retrying....');
      log.log('error', 'NotificationService checkConnection() method: ', error);
    }
  }
}
