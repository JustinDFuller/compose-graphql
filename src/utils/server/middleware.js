export default ({ server, dependencies }) => {
  server.use(dependencies.helmet());
  server.use(dependencies.compression());
  server.use('/public', dependencies.express.static('dist/public'));
};
