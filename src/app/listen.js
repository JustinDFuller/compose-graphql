export default ({ app, env, log }) => {
  app.listen(env.port, () => log.info(`App listening on ${env.port}`));
}