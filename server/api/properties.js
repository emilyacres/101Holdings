const router = require('express').Router()
const { Property } = require('../db/models')


router.put('/:propertyid', (req, res, next) => {
  Property.update(req.body, {
    where: {
      id: req.params.propertyid,
    }
  }).then(updatedProperty => {
    res.json(updatedProperty);
  }).catch(next)
})

router.delete('/:propertyid', (req, res, next) => {

  let rank;

  Property.findOne({
    where: {
      id: req.params.propertyid
    }
  }).then( propertyToDelete => {
    rank = propertyToDelete.rank
    return rank
  }).then( propertyRank => {
    return Property.findAll({})
  }).then( allProperties => {
    let propertiesToUpdate = [];
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
        }).then( updatedProperty => {
          console.log("updated rank")
        }).catch(next)
      }
    })
    return Property.destroy({
              where: {
                id: req.params.propertyid
              }
            })
  }).then( deletedProperty => {
    res.redirect('/admin')
  }).catch(next)

})

router.post('/', (req, res, next) => {
  Property.create(req.body, {
    where: {
      id: req.params.propertyid,
    }
  }).then(newProperty => {
    res.json(newProperty);
  }).catch(next)
})


router.get('/', (req, res, next) => {
  Property.findAll({

  }).then(properties => {
    res.json(properties)
  }).catch(next)
})

module.exports = router
