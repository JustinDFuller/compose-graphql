export default ({ database, dependencies }) => database.define('User', {
  id: {
    primaryKey: true,
    type: dependencies.Sequelize.UUIDV4,
    defaultValue: dependencies.Sequelize.UUIDV4,
  },
  username: {
    type: dependencies.Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: dependencies.Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
  password: {
    type: dependencies.Sequelize.STRING,
    validate: {
      len: [6, 100],
    },
    allowNull: false,
  },
});
