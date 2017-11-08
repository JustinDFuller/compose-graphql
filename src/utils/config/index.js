import dotenv from 'dotenv';

export default () => {
  dotenv.config();
  const config = {
    env: JSON.parse(JSON.stringify(process.env)),
  };
  config.env.port = config.env.port || 8080;
  config.env.wsPort = config.env.wsPort || 8081;
  return config;
};
