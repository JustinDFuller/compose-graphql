export default ({ routes, app, dependencies, log }) => {
  const { _ } = dependencies;
  routes.forEach(route => {
     app[_.lowerCase(route.method)](route.url, route.callback);
     log.info(`Route created ${route.url} for method ${route.method}`);
  });
}