export default ({ httpServer, env, log }) => {
  httpServer.listen(env.port, () => log.info(`Server listening on ${env.port}`));
};
