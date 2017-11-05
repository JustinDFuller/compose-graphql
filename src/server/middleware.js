export default ({ app, dependencies }) => {
  app.use(dependencies.helmet());
  app.use(dependencies.compression());
};
