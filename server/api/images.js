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
  })
})

module.exports = router
