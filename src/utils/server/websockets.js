import http from 'http';

export default ({ server, dependencies, sockets, ...rest }) => {
  const { _ } = dependencies;
  const httpServer = http.Server(server);
  const websockets = dependencies.io(httpServer);
  websockets.on('connection', socket => sockets.forEach(
    handler,
    socket.on(handler.name, _.partial(handler.callback, {
      server,
      dependencies,
      websockets,
      ...rest,
    }))
  ));

  return {
    websockets,
  };
};