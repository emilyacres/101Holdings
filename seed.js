var Promise = require('bluebird');
var db = require('./server/db');
// var { cart, user, order, product, review } = db

const { User, Property, Image } = require('./server/db/models')


var data = {
  users: [
      {email: "admin", password: "admin",},
    ],
  properties: [
      {name: "145 Greene Street", city: "New York, NY", acquired: "09.2013", feet: 2747},
      {name: "Philip House", city: "New York, NY", acquired: "02.2014", feet: 9045},
      {name: "The Shops at the Bravern", city: "Bravern, WA", acquired: "03.2012", feet: 310000},
      {name: "555 Grand Concourse", city: "Bronx, NY", acquired: "01.2011", feet: 3440},
      {name: "Miami Design District", city: "Miami, FL", acquired: "09.2014", feet: 1000000},
   ],
  images: [
      {fileName: "/img/1", propertyId: 1},
      {fileName: "/img/2", propertyId: 2},
      {fileName: "/img/3", propertyId: 3},
      {fileName: "/img/4", propertyId: 4},
      {fileName: "/img/5", propertyId: 5},
    ],
};

db.sync({force:true})
.then(function() {
  console.log("Dropped old data, now inserting data");
  const creatingUsers = Promise.map(data.users, function (user) {
    return User.create(user);
  });
  return Promise.all(creatingUsers)
})
.then(function () {
  const creatingProperties = Promise.map(data.properties, function (property) {
    return Property.create(property);
  })
  const creatingImages = Promise.map(data.images, function (image) {
    return Image.create(image);
  })
    return Promise.all([creatingProperties, creatingImages]);
})
.then(function () {
  console.log('Finished inserting data');
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
