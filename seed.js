var Promise = require('bluebird');
var db = require('./server/db');

const { User, Property } = require('./server/db/models')


var data = {
  users: [
      {email: "admin", password: "1oh1admin"},
    ],
  properties: [
      {name: "841 Madison Avenue", city: "New York", state: "New York", zip: "10021", acquired: "2010", feet: 18000, img: "101holdings-841madison-full.jpg", thumb: "101holdings-841madison-thumb.jpg"},
      {name: "66 Leonard Street", city: "New York", state: "New York", zip: "10013", acquired: "2012", feet: 25746, img: "101holdings-66leonard-full.jpg", thumb: "101holdings-66leonard-thumb.jpg"},
      {name: "The Chrystie", city: "New York", state: "New York", zip: "10002", acquired: "2014", feet: 339330, img: "101holdings-229chrystie-full.jpg", thumb: "101holdings-229chrystie-thumb.jpg"},
      {name: "415 Greenwich Street", city: "New York", state: "New York", zip: "10013", acquired: "2014", feet: 4971, img: "101holdings-415greenwich-full.jpg", thumb: "101holdings-415greenwich-thumb.jpg"},
      {name: "200 Central Park South", city: "New York", state: "New York", zip: "10019", acquired: "2014", feet: 31249, img: "101holdings-200cps-full.jpg", thumb: "101holdings-200cps-thumb.jpg"},
      {name: "1424 Lexington Avenue", city: "New York", state: "New York", zip: "10128", acquired: "2014", feet: 13256, img: "101holdings-1424lexington-full.jpg", thumb: "101holdings-1424lexington-thumb.jpg"},
      {name: "1991 Broadway", city: "New York", state: "New York", zip: "10023", acquired: "2013", feet: 7150, img: "101holdings-1991broadway-full.jpg", thumb: "101holdings-1991broadway-thumb.jpg"},
      {name: "285 Lafayette Street", city: "New York", state: "New York", zip: "10012", acquired: "2014", feet: 6900, img: "101holdings-285lafayette-full.jpg", thumb: "101holdings-285lafayette-thumb.jpg"},
      {name: "145 Greene Street", city: "New York", state: "New York", zip: "10012", acquired: "2013", feet: 2747, img: "101holdings-145greene-full.jpg", thumb: "101holdings-145greene-thumb.jpg"},
      {name: "1311 Lexington Avenue", city: "New York", state: "New York", zip: "10128", acquired: "2014", feet: 9045, img: "101holdings-1311lexington-full.jpg", thumb: "101holdings-1311lexington-thumb.jpg"},
      {name: "21 East 62nd Street", city: "New York", state: "New York", zip: "10065", acquired: "2013", feet: 5782, img: "101holdings-2162nd-full.jpg", thumb: "101holdings-2162nd-thumb.jpg"},
      {name: "555 West 59th Street", city: "New York", state: "New York", zip: "10019", acquired: "2014", feet: 40568, img: "101holdings-55559th-full.jpg", thumb: "101holdings-55559th-thumb.jpg"},
      {name: "4168 Broadway", city: "New York", state: "New York", zip: "10033", acquired: "2012", feet: 99201, img: "101holdings-4168broadway-full.jpg", thumb: "101holdings-4168broadway-thumb.jpg"},
      {name: "2067 Broadway", city: "New York", state: "New York", zip: "10023", acquired: "2014", feet: 14007, img: "101holdings-2067broadway-full.jpg", thumb: "101holdings-2067broadway-thumb.jpg"},
      {name: "300 West 145th Street", city: "New York", state: "New York", zip: "10039", acquired: "2012", feet: 84644, img: "101holdings-300145th-full.jpg", thumb: "101holdings-300145th-thumb.jpg"},
      {name: "1400 Fifth Avenue", city: "New York", state: "New York", zip: "10026", acquired: "2014", feet: 30807, img: "101holdings-14005th-full.jpg", thumb: "101holdings-14005th-thumb.jpg"},
      {name: "115 Seventh Avenue", city: "New York", state: "New York", zip: "10011", acquired: "2014", feet: 41500, img: "101holdings-1157th-full.jpg", thumb: "101holdings-1157th-thumb.jpg"},
      {name: "1110 Third Avenue", city: "New York", state: "New York", zip: "10065", acquired: "2015", feet: 25175, img: "101holdings-11103rd-full.jpg", thumb: "101holdings-11103rd-thumb.jpg"},
      {name: "730 Lexington Avenue", city: "New York", state: "New York", zip: "10022", acquired: "2015", feet: 5879, img: "101holdings-730lexington-full.jpg", thumb: "101holdings-730lexington-thumb.jpg"},
      {name: "1022 Lexington Avenue", city: "New York", state: "New York", zip: "10021", acquired: "2016", feet: 4307, img: "101holdings-1022lexington-full.jpg", thumb: "101holdings-1022lexington-thumb.jpg"},
      {name: "3860 East Tremont Avenue", city: "Bronx", state: "New York", zip: "10465", acquired: "2015", feet: 14892, img: "101holdings-3860tremont-full.jpg", thumb: "101holdings-3860tremont-thumb.jpg"},
      {name: "235 East 14th Street", city: "New York", state: "New York", zip: "10003", acquired: "2013", feet: 22254, img: "101holdings-23514th-full.jpg", thumb: "101holdings-23514th-thumb.jpg"},
      {name: "3560 Broadway", city: "New York", state: "New York", zip: "10031", acquired: "2012", feet: 21600, img: "101holdings-3560broadway-full.jpg", thumb: "101holdings-3560broadway-thumb.jpg"},
      {name: "4162 Broadway", city: "New York", state: "New York", zip: "10033", acquired: "2016", feet: 34248, img: "101holdings-4162broadway-full.jpg", thumb: "101holdings-4162broadway-thumb.jpg"},
      {name: "601 Eighth Avenue", city: "New York", state: "New York", zip: "10018", acquired: "2014", feet: 28750, img: "101holdings-6018th-full.jpg", thumb: "101holdings-6018th-thumb.jpg"},
      {name: "609 Eighth Avenue", city: "New York", state: "New York", zip: "10018", acquired: "2014", feet: 3752, img: "101holdings-6098th-full.jpg", thumb: "101holdings-6098th-thumb.jpg"},
      {name: "156 Delancey Street", city: "New York", state: "New York", zip: "10002", acquired: "2013", feet: 2752, img: "101holdings-156delancey-full.jpg", thumb: "101holdings-156delancey-thumb.jpg"},
      {name: "4138 Broadway", city: "New York", state: "New York", zip: "10033", acquired: "2013", feet: 5458, img: "101holdings-4138broadway-full.jpg", thumb: "101holdings-4138broadway-thumb.jpg"},
      {name: "144 Dyckman Street", city: "New York", state: "New York", zip: "10040", acquired: "2013", feet: 13000, img: "101holdings-144dyckman-full.jpg", thumb: "101holdings-144dyckman-thumb.jpg"},
      {name: "142 Duane Street", city: "New York", state: "New York", zip: "10013", acquired: "2014", feet: 7668, img: "101holdings-142duane-full.jpg", thumb: "101holdings-142duane-thumb.jpg"},
      {name: "4250 Broadway", city: "New York", state: "New York", zip: "10033", acquired: "0000", feet: 40100, img: "101holdings-4250broadway-full.jpg", thumb: "101holdings-4250broadway-thumb.jpg"},
      {name: "249 Church Street", city: "New York", state: "New York", zip: "10013", acquired: "2015", feet: 4580, img: "101holdings-249church-full.jpg", thumb: "101holdings-249church-thumb.jpg"},
      {name: "1 Bagopa Plaza", city: "Mount Vernon", state: "New York", zip: "10550", acquired: "2017", feet: 63515, img: "101holdings-1bagopa-full.jpg", thumb: "101holdings-1bagopa-thumb.jpg"},
      {name: "257 Church Street", city: "New York", state: "New York", zip: "10013", acquired: "2012", feet: 5138, img: "101holdings-257church-full.jpg", thumb: "101holdings-257church-thumb.jpg"},
      {name: "170-178 Ninth Avenue", city: "New York", state: "New York", zip: "10011", acquired: "2017", feet: 4250, img: "101holdings-170-1789th-full.jpg", thumb: "101holdings-170-1789th-thumb.jpg"},
      {name: "2040 White Plains Road", city: "Bronx", state: "New York", zip: "10462", acquired: "0000", feet: 0, img: "101holdings-2040whiteplains-full.jpg", thumb: "101holdings-2040whiteplains-thumb.jpg"},
      {name: "5517 Broadway", city: "Bronx", state: "New York", zip: "10463", acquired: "0000", feet: 0, img: "101holdings-5517broadway-full.jpg", thumb: "101holdings-5517broadway-thumb.jpg"},
      {name: "500 Waverly", city: "Brooklyn", state: "New York", zip: "11238", acquired: "0000", feet: 0, img: "101holdings-500waverly-full.jpg", thumb: "101holdings-500waverly-thumb.jpg"},
      {name: "216 Lafayette Street", city: "New York", state: "New York", zip: "10012", acquired: "0000", feet: 0, img: "101holdings-216lafayette-full.jpg", thumb: "101holdings-216lafayette-thumb.jpg"},
      {name: "1851 Bruckner Boulevard", city: "Bronx", state: "New York", zip: "10472", acquired: "0000", feet: 41000, img: "101holdings-1851bruckner-full.jpg", thumb: "101holdings-1851bruckner-thumb.jpg"}
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
    return Promise.all(creatingProperties);
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
