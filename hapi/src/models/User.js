const Sequelize = require('sequelize');
const { Model } = Sequelize;
const db = require('../db');

class User extends Model {
  get slug() {
    return this.title.replace(/[^a-zA-Z0-9]/g, '-');
  }
}

User.init({
  pseudo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  niveau: {
    type: Sequelize.INTEGER,
  },
  exp: {
    type: Sequelize.INTEGER,
  },
  prot: {
    type: Sequelize.INTEGER,
  },
}, {
  sequelize: db,
  modelName: 'user',
});

User.sync();

module.exports = User