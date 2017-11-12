export default ({
  routes, server, dependencies, log, websockets,
}) => {
  const { _ } = dependencies;
  routes.forEach((route) => {
    server[_.lowerCase(route.method)](route.url, _.partialRight(route.callback, websockets));
    log.info(`Route created ${route.url} for method ${route.method}`);
  });
};
