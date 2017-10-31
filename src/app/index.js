export default ({ routes, env, dependencies }) => {
  const port = env.port || 8080;
  const app = dependencies.express();
  
  app.use(dependencies.helmet());
  app.use(dependencies.compression());
  
  routes.forEach(route => {
     app[route.method](route.url, route.callback);
     console.log(`Route created ${route.url} for method ${route.method}`);
  });
  
  app.listen(port, () => console.log(`App listening on ${port}`));

  return {
    env,
    dependencies,
    app,
  };
}