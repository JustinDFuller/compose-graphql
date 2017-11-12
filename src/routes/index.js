export default ({ log, dependencies, models }) => ({
  routes: [{
    method: 'get',
    url: '/user/:id',
    callback: (req, res, next, websockets) => {
      models.User.findById(req.params.id).then(user => res.json(user));
    },
  },
  {
    method: 'post',
    url: '/user',
    callback: (req, res, next, websockets) => {
      models.User.upsert(req.body).then(user => res.json(user));
    },
  },
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
    callback: (req, res, next, websockets) => res.send(req.session.name || 'Guest'),
  },
  {
    method: 'get',
    url: '/',
    callback: (req, res, next, websockets) => res.sendFile(dependencies.path.join(__dirname, '../../dist/public/index.html')),
  },
  ],
});
