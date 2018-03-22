const router = require('express').Router()
const { Property, Image } = require('../db/models')


router.put('/upone/:propertyid', (req, res, next) => {
  let upOne = {
    rank: req.body.rank - 1
  };

  let downOne = {
    rank: req.body.rank
  };

  Property.update( downOne, {
    where: {
      rank: req.body.rank - 1
    }
  }).then( updatedProperty => {
    return Property.update( upOne, {
      where: {
        id: req.params.propertyid
      }
    })
  }).then( updatedProperty2 => {
    return Property.findAll({
      include: [ { model: Image, as: 'images' } ]
    })
  }).then( properties => {
    res.send(properties);
  }).catch(next);
})


router.put('/upall/:propertyid', (req, res, next) => {
  let rank = req.body.rank;
  Property.findAll({})
  .then( allProperties => {
    allProperties.forEach( property => {
      if (property.rank < rank) {
        property.rank++
        let newProp = {
          rank: property.rank++
        }
        Property.update(newProp, {
          where: {
            id: property.id
          }
        }).then( updatedProperty => {
          console.log("updated rank")
        }).catch(next)
      }
    })
    return Property.update( {rank: 1}, {
      where: {
        id: req.params.propertyid
      }
    })
  }).then( topProperty => {
    return Property.findAll({
      include: [ { model: Image, as: 'images' } ]
    })
  }).then( properties => {
    res.send(properties)
  }).catch(next)
})


router.put('/downone/:propertyid', (req, res, next) => {

  let upOne = {
    rank: req.body.rank
  };

  let downOne = {
    rank: req.body.rank + 1
  };

  Property.update( upOne, {
    where: {
      rank: req.body.rank + 1
    }
  }).then( updatedProperty => {
    return Property.update( downOne, {
      where: {
        id: req.params.propertyid
      }
    })
  }).then( updatedProperty2 => {
    return Property.findAll({
      include: [ { model: Image, as: 'images' } ]
    })
  }).then( properties => {
    res.send(properties);
  }).catch(next);
})


router.put('/downall/:propertyid', (req, res, next) => {
  let rank = req.body.rank;
  Property.findAll({})
  .then( allProperties => {
    allProperties.forEach( property => {
      if (property.rank > rank) {
        property.rank--
        let newProp = {
          rank: property.rank--
        }
        Property.update(newProp, {
          where: {
            id: property.id
          }
        }).then( updatedProperty1 => {
          console.log("updated rank")
        }).catch(next)
      }
    })
    return allProperties.length
  }).then( length => {
    return Property.update( {rank: length}, {
      where: {
        id: req.params.propertyid
      }
    })
  }).then( botProperty => {
    return Property.findAll({
      include: [ { model: Image, as: 'images' } ]
    })
  }).then( properties => {
    console.log(properties)
    res.send(properties)
  }).catch(next)
})

module.exports = router
