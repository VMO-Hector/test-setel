// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const config: Configs = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3002,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  portDb: parseInt(process.env.DB_PORTDB, 10),
  serviceName: 'payment-api',
  swagger: {
    title: 'Payment Service',
    description: 'Swagger documentation for Payment Service APIs',
    version: '1.0.0',
  },
};
export interface Configs {
  port: number;
  host: string;
  user: string;
  password: string;
  database: string;
  portDb: number;
  serviceName: string;
  swagger: {
    title: string;
    description: string;
    version: string;
  };
}

export default config;
