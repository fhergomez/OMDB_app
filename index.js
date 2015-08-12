var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');


var app = express();

// var moviesController = require("./controllers/movies");
require('express-helpers')(app); // express helpers, used for link_to

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public')); // used for static files, like css
app.use(ejsLayouts);
app.use(methodOverride('_method'))


app.get('/', function(req, res){
  res.render('movies/index');
  // });
});
// main controller
app.use('/movies', require('./controllers/movies.js'));
app.use('/favorites', require('./controllers/favorites.js'));

app.listen(3000);