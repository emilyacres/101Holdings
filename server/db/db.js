const Sequelize = require('sequelize')
// const db = new Sequelize(
//   process.env.DATABASE_URL || 'postgres://localhost:5432/oneohone', {
//     logging: false
//   }
// )

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  var db = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  false //true
  });
} else {
  // the application is executed on the local machine
  var db = new Sequelize("postgres://localhost:5432/oneohone", {
    logging: false
  });
}
module.exports = db
