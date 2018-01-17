const { User } = require('../db/models')
const router = require('express').Router()
var multer  = require('multer')
//var upload = multer({dest: __dirname + '/public'}).single('image')
var upload = multer({dest: 'img/'})

router.post('/', upload.single('img'), function(req, res) {
  //console.log("body", req.body)
  console.log("file", req.file)
});

module.exports = router
