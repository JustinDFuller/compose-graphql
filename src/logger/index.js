export default ({ dependencies }) => ({
  log: dependencies.bunyan.createLogger({ name: 'compose-app' }),
});
