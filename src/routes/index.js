import client from './client';

export default ({ log, dependencies }) => ({
  routes: [
    {
      method: 'post',
      url: '/login',
      callback: (req, res, next, websockets) => {
        req.session.name = req.body.name;
        return res.send();
      },
    },
    {
      method: 'get',
      url: '/logout',
      callback: (req, res, next, websockets) => {
        req.session.name = '';
        return res.send();
      },
    },
    {
      method: 'get',
      url: '/user',
      callback: (req, res, next, websockets) => {
        return res.send(req.session.name || 'Guest');
      },
    },
    {
      method: 'get',
      url: '/',
      callback: client({ log, dependencies }),
    },
  ],
});
