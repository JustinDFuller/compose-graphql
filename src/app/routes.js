export default () => ({
  routes: [
    {
      method: 'get',
      url: '*',
      callback: (req, res) => res.send('Hello world'),
    },
  ],
});
