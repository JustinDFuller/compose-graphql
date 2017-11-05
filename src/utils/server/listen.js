export default ({ server, env, log }) => {
  server.listen(env.port, () => log.info(`Server listening on ${env.port}`));
}