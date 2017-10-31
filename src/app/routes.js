export default ({ log }) => ({
  routes: [
    {
      method: 'get',
      url: '*',
      callback: (req, res) => {
        log.debug('Hello world');
        return res.send('Hello world');
      },
    },
  ],
});
