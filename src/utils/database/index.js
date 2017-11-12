export default modelDefinitions => async (appConfig) => {
  const { dependencies, log } = appConfig;
  const database = new dependencies.Sequelize('sqlite://:memory:');

  const models = modelDefinitions({ ...appConfig, database });

  try {
    await database.authenticate();
    log.info('Connection has been established successfully.');
    await database.sync();
    log.info('Database synced successfully.');
  } catch (e) {
    log.error('Error initializing database', e);
  }

  return {
    database,
    models,
  };
};
