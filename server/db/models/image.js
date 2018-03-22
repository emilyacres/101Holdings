const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('image', {
  filename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Image;
