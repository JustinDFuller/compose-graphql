export default ({ database, dependencies }) => database.define('User', {
  username: dependencies.Sequelize.STRING,
  email: dependencies.Sequelize.STRING,
  password: dependencies.Sequelize.STRING,
});
