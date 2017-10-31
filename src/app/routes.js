export default application => ({
  ...application,
  routes: [
    {
      method: 'GET',
      url: '*',
      callback: (req, res) => res.send('Hello world'),
    },
  ],
});
