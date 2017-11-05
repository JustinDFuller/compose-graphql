export default ({ log, dependencies }) => ({
  routes: [
    {
      name: 'echo',
      callback: ({ websockets }, data) => {
        websockets.emit('echo test', data);
      },
    },
  ],
});
