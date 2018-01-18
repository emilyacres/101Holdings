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
//var upload = multer({dest: __dirname + '/public'}).single('image')
var upload = multer({storage: storage})

router.post('/thumb/:propertyid', upload.single('img'), function(req, res) {
  //console.log("params", req.params)
  Property.update({
      thumb: req.file.filename
    }, {
    where: {
      id: req.params.propertyid,
    }
  }).then(updatedProperty => {
    res.send("updatedProperty" + updatedProperty);
  })
  //console.log("file************", req.file)
});


router.post('/:propertyid', upload.single('img'), function(req, res) {
  //console.log("params", req.params)
  Property.update({
      img: req.file.filename
    }, {
    where: {
      id: req.params.propertyid,
    }
  }).then(updatedProperty => {
    res.send("updatedProperty" + updatedProperty);
  })
  //console.log("file************", req.file)
});

router.post('/', upload.single('img'), function(req, res) {
  console.log("body", req.body)
  console.log("file************", req.file)
});

module.exports = router
