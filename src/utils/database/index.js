export default modelDefinitions => appConfig => {
    const { dependencies, log } = appConfig;
    const database = new dependencies.Sequelize('sqlite://:memory:');

    const models = modelDefinitions({...appConfig, database });

    database.authenticate()
        .then(() => log.info('Connection has been established successfully.'))
        .catch(err => log.error('Error connecting to database', err));

    database.sync()
        .then(() => log.info('Database synced successfully.'))
        .catch(err => log.error('Error syncing database', err));

    return {
        database,
        models,
    }
}