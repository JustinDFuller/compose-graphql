export default ({ log, dependencies }) => ({
  sockets: [
    {
      name: 'echo',
      callback: ({ websockets }, data) => {
        websockets.emit('echo test', data);
      },
    },
    {
      name: 'chat message',
      callback: ({ websockets }, data) => {
        websockets.emit('chat message', data);
      },
    }
  ],
});
