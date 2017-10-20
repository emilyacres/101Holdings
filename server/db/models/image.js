const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('image', {
  fileName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Image;
