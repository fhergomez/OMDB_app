var db = require('./models');
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var flash = require('connect-flash');


var app = express();

// var moviesController = require("./controllers/movies");
require('express-helpers')(app); // express helpers, used for link_to

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public')); // used for static files, like css
app.use(ejsLayouts);
app.use(methodOverride('_method'))
app.use(session({
  secret: 'a;dkjsflkadsjflkas;fasldjf;asajfk',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(function(req,res,next){
  // req.session.user=7; //this line is for testing purposes make sure to comment it out before deploying
  if(req.session.user){
    db.user.findById(req.session.user).then(function(user){
      req.currentUser = user;
      next();
    })
  }else{
    req.currentUser = false;
    next();
  }
});

app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
})


app.get('/', function(req, res){
  res.render('main/index');
  // });
});
// main controller
app.use('/movies', require('./controllers/movies.js'));
app.use('/favorites', require('./controllers/favorites.js'));
app.use('/',require('./controllers/movies.js'));
app.use('/auth',require('./controllers/auth.js'));

app.listen(3000);