// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import * as local from './local.json';
import * as production from './production.json';

const env = process.env.APP_ENV;
const configs = { local, production };

const config: Configs = configs[env];

config['port'] = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
config['host'] = process.env.DB_HOST;
config['user'] = process.env.DB_USERNAME;
config['password'] = process.env.DB_PASSWORD;
config['database'] = process.env.DATABASE;
config['portDb'] = parseInt(process.env.DB_PORTDB, 10);
config['serviceName'] = 'orders-api';
config['paymentApiUrl'] = `http://payment-service:${process.env.PORT_PAYMENT}`;
config['swagger'] = {
  title: 'Orders Service',
  description: 'Swagger documentation for Order Service APIs',
  version: '1.0.0',
};
export interface Configs {
  port: number;
  host: string;
  user: string;
  password: string;
  database: string;
  portDb: number;
  serviceName: string;
  paymentApiUrl: string;
  swagger: {
    title: string;
    description: string;
    version: string;
  };
}

export default config;
