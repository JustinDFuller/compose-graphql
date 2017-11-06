export default ({ log, dependencies }) => ({
  routes: [
    {
      method: 'get',
      url: '/',
      callback: (req, res, next, websockets) => {
        websockets.emit('chat message', 'Hello World!');

        log.debug('Hello world');
        return res.send('Hello world');
      },
    },
  ],
});
