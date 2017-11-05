export default ({ server, dependencies }) => {
  server.use(dependencies.helmet());
  server.use(dependencies.compression());
};
