var db = require('../models');
var express = require('express');
var router = express.Router();

// GET http://localhost:3000/favorites/:id/comments
router.get("/", function(req,res){
  res.send(req.params);
});

module.exports = router;