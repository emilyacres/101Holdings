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
  acquired: {
    type: Sequelize.STRING,
    allowNull: false
  },
  feet: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

module.exports = Property;
