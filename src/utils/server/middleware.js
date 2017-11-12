export default ({ server, dependencies, env }) => {
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
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
  server.use(
    '/public',
    dependencies.express.static(dependencies.path.join(__dirname, '../../../dist/public')),
  );
};
