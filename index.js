var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
// var moviesController = require("./controllers/movies");
// express helpers, used for link_to
require('express-helpers')(app);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// used for static files, like css
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
// app.use("/movies", moviesController);

// home page
app.get('/', function(req, res){
  res.render('main/index.ejs');
});

app.get('/main', function (req, res) {
    var searchTerm = req.query.q;
    var url = "http://www.omdbapi.com/?s=" + searchTerm;

    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("main/results.ejs", {movieList: data.Search});
        }
    });
});

app.get('/main/:id', function (req, res) {
    var id = req.params.id;
    var url = "http://www.omdbapi.com/?i=" + id.toLowerCase() +"&plot=fullt&tomatoes=true&r=json";

    request(url, function (error, response, data) {
        if (!error && response.statusCode === 200) {
            var parsedData = JSON.parse(data);
            // res.send(results);
            res.render("main/show.ejs", {movieid: parsedData});
        }
    });
});






app.listen(3000);