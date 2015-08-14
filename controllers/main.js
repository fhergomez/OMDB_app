var db = require('../models');
var express = require('express');
var router = express.Router();

//GET /
//home page of site
router.get('/',function(req,res){
    res.render('movies/index');
});

//GET /restricted
//an example restricted page
router.get('/restricted',function(req,res){
  if(req.currentUser){
    res.render('movies/restricted');
  } else {
    req.flash('danger','ACCESS DENIED');
    res.redirect('/');
  }
});


module.exports = router;