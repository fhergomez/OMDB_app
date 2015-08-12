var db = require('../models');
var express = require('express');
var router = express.Router();

// http://localhost:3000/favorites
router.get('/', function(req, res){
  db.favorite.findAll({
    include:[db.comment]
  }).then(function(favorites){
    res.render('favorites/index',{favorites:favorites});
  });
});


router.post('/', function(req, res){
  db.favorite.create({
      imdbId:req.body.imdbId,
      title:req.body.title,
      year:req.body.year,
      poster:req.body.poster
    }).then(function(favorite){
        res.redirect('/movies/' + req.body.imdbId);
    });
   // res.send(req.body); // make sure body-parser is installed to test and data is parsed in JSON format
});

// DELETE http://localhost:3000/favorites/:id
router.delete('/:id',function(req, res){
  db.favorite.destroy({where:{id:req.params.id}}).then(function(){
    res.redirect('/favorites');
  });
});


// GET http;://localhost:3000/favorites/:id/comments
router.get('/:id/comments',function(req,res){
  // res.send(req.params);
  db.favorite.find({where:{id:req.params.id},
    include:[db.comment]}).then(function(favorite){
      res.render('comments/index', {favorite:favorite});
  });
});

router.post('/:id/comments',function(req,res){
  // res.send('ADDING COMMENT');
  db.favorite.findById(req.params.id).then(function(favorite){
    favorite.createComment({body:req.body.body}).then(function(comment){
      res.redirect('/favorites/' + favorite.id + '/comments');
    })
  });
  // res.send({params:req.params,body:req.body});
});

router.get('/:id', function(req, res) {
  db.favorite.find({where:{id: parseInt(req.params.id)},
    include:[db.tag]}).then(function(favorite) {
      res.render('favorites/show', {favorite:favorite});
    });
});

router.get('/:id/tags/new', function(req, res) {
  res.render('tags/new', {favoriteId: req.params.id});
});

router.post('/:id/tags',function(req,res){
  // res.send("The tag name: " + req.body.tagName + "<br>The post id: " + req.params.id);
  var tagName = req.body.tagName;
  var favoriteId = req.params.id;
  db.favorite.findbyId(favoriteId).then(function(favorite){
    db.tag.findOrCreate({where: {name: tagName}
    }).spread(function(tag,created){
      favorite.addTag(tag).then(function(){
        res.redirect('/favorites/' + favorite.id);
      });
    });
  });
  // res.send({params:req.params,body:req.body});
});

module.exports = router;

