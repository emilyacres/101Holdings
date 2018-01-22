const Sequelize = require('sequelize')
// const db = new Sequelize(
//   process.env.DATABASE_URL || 'postgres://localhost:5432/oneohone', {
//     logging: false
//   }
// )

var isProduction = process.env.NODE_ENV == 'production' ? true : false


var connectionString = 'postgres://oqjlkcwyzndolb:9a1e189c8be091a9a47d76e18e71a0659504b030f855c4a0313456253e795fc3@ec2-174-129-22-84.compute-1.amazonaws.com:5432/d7pbvkurlik213'
if (isProduction) {
  // the application is executed on Heroku ... use the postgres database
  var db = new Sequelize(connectionString, {
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
