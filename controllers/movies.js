var db = require('../models');
var express = require('express');
var router = express.Router();
var request = require('request');

// http://localhost:3000/
router.get('/', function (req, res) {
    var searchTerm = req.query.q;
    var url = "http://www.omdbapi.com/?s=" + searchTerm;
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("movies/results.ejs", {movieList: data.Search});
        }
    });
});

//GET http://localhost:3000/movies/:id
router.get("/:id", function(req, res) {
  var movieId = req.params.id;
  var url = "http://www.omdbapi.com/?i=" + movieId + "&plot=full";
  request(url, function(error, response, data) {
    db.favorite.find({where:{imdbId:movieId}}).then(function(favorite){
      // res.send(movie);
      res.render("movies/show", {
        movieid: JSON.parse(data),
        favorite:favorite
      })
    });
  });
});

module.exports = router;