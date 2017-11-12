export default ({ database, dependencies }) => database.define('User', {
    username: dependencies.Sequelize.STRING,
    password: dependencies.Sequelize.STRING
})