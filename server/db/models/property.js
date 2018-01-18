const Sequelize = require('sequelize');
const db = require('../db');

const Property = db.define('property', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  acquired: {
    type: Sequelize.STRING,
    allowNull: false
  },
  feet: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: true
  },
  thumb: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Property;
