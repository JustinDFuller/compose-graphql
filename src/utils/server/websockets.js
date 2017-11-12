export default (appConfig) => {
  const {
    log, server, dependencies, sockets,
  } = appConfig;
  const { _, io, http } = dependencies;
  const httpServer = http.Server(server);
  const websockets = io(httpServer);

  websockets.on('connection', (socket) => {
    log.info('New socket connection');
    sockets.forEach(handler => socket.on(handler.name, _.partial(handler.callback, {
      websockets,
      httpServer,
      ...appConfig,
    })));
  });

  return {
    websockets,
    httpServer,
  };
};
