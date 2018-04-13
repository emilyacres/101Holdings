const router = require('express').Router()
const { Property, Image } = require('../db/models')

router.delete('/:imageid', (req, res, next) => {
  Image.destroy({
    where: {
      id: req.params.imageid
    }
  }).then( deletedImage => {
    return Property.findAll({
      include: [ { model: Image, as: 'images' } ]
    })
  }).then( properties => {
    res.json(properties)
  }).catch(next)
})

router.post('/', (req, res, next) => {
  console.log("here", req.body)
  Image.create(req.body, {
  }).then( newImg => {
    return Property.findAll({
      include: [ { model: Image, as: 'images' } ]
    })
  }).then( properties => {
    res.json(properties)
  }).catch(next)
})

module.exports = router
