const Sequelize = require('sequelize')
// const db = new Sequelize(
//   process.env.DATABASE_URL || 'postgres://localhost:5432/oneohone', {
//     logging: false
//   }
// )
let db;
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true //false
  });
} else {
  // the application is executed on the local machine
  db = new Sequelize("postgres://localhost:5432/oneohone");
}
module.exports = db
