const router = require('express').Router()
const { Property } = require('../db/models')
module.exports = router

router.put('/:propertyid', (req, res, next) => {
  Property.update(req.body, {
    where: {
      id: req.params.propertyid,
    }
  }).then(updatedProperty => {
    res.json(updatedProperty);
  })
})


router.get('/', (req, res, next) => {
  Property.findAll({

  }).then(properties => {
    res.json(properties)})
  .catch(next)
})
