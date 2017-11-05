export default () => {
  const config = {
    env: JSON.parse(JSON.stringify(process.env)),
  };
  config.env.port = config.env.port || 8080;
  return config;
};
