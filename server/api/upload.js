const { Property } = require('../db/models')
const router = require('express').Router()
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/')
  },
   filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

var upload = multer({storage: storage})

router.post('/thumb/:propertyid', upload.single('img'), function(req, res) {
  Property.update({
      thumb: req.file.filename
    }, {
    where: {
      id: req.params.propertyid,
    }
  }).then(updatedProperty => {
    res.redirect('/admin/' + updatedProperty)
  })
});


router.post('/:propertyid', upload.single('img'), function(req, res) {
  Property.update({
      img: req.file.filename
    }, {
    where: {
      id: req.params.propertyid,
    }
  }).then(updatedProperty => {
        res.redirect('/admin/' + updatedProperty)
  })
});


module.exports = router
