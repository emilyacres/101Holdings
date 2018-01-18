const router = require('express').Router()
const { Property } = require('../db/models')
module.exports = router
var multer  = require('multer')
var upload = multer({ dest: '../public/img/' })

router.put('/:propertyid', upload.single('img'), (req, res, next) => {
  Property.update(req.body, {
    where: {
      id: req.params.propertyid,
    }
  }).then(updatedProperty => {
    res.json(updatedProperty);
  })
})

router.post('/', (req, res, next) => {
  Property.create(req.body, {
    where: {
      id: req.params.propertyid,
    }
  }).then(newProperty => {
    res.json(newProperty);
  })
})


router.get('/', (req, res, next) => {
  Property.findAll({

  }).then(properties => {
    res.json(properties)})
  .catch(next)
})
