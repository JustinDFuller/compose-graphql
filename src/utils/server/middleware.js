export default ({ server, dependencies, env }) => {
  server.use(dependencies.helmet());
  server.use(dependencies.compression());
  server.use(dependencies.cookieParser());
  server.use(dependencies.bodyParser.json());
  server.use(dependencies.bodyParser.urlencoded({ extended: true }));
  server.use(dependencies.cookieSession({
    name: 'session',
    secret: env.SESSION_KEY,
    maxAge: Number(env.SESSION_MAX_AGE) || 24 * 60 * 60 * 1000,
  }));
  server.use('/public', dependencies.express.static('dist/public'));
};
