export default ({ log, dependencies }) => ({
  routes: [
    {
      method: 'get',
      url: '/',
      callback: (req, res, next, websockets) => {
        websockets.emit('echo back', 'Hello World!');

        log.debug('Hello world');
        return res.send('Hello world');
      },
    },
  ],
});
