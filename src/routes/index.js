export default ({ log, dependencies }) => ({
  routes: [
    {
      method: 'get',
      url: '/',
      callback: (req, res, next, websockets) => {
        websockets.broadcast = function broadcast(data) {
          websockets.clients.forEach(function each(client) {
            if (client.readyState === dependencies.ws.OPEN) {
              client.send(data);
            }
          });
        };

        log.debug('Hello world');
        return res.send('Hello world');
      },
    },
  ],
});
