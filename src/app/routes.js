export default application => ({
  ...application,
  routes: [
    {
      method: 'get',
      url: '*',
      callback: (req, res) => res.send('Hello world'),
    },
  ],
});
