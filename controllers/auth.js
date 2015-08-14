var db = require('../models');
var express = require('express');
var router = express.Router();

//GET /auth/login
//display login form
router.get('/login',function(req,res){
    res.render('auth/login');
});

//POST /login
//process login data and login user
router.post('/login',function(req,res){
    //do login here (check password and set session value)
    db.user.authenticate(req.body.email,req.body.password,
      function(err,user){
        if(err){
          res.send(err);
        } else if(user){
          //user is logged in forward them to the home page
          req.session.user = user.id;
          req.flash('success','You\'re logged in')
          res.redirect('/');
        } else {
          req.flash('danger','invalid username or password');
          res.redirect('/auth/login');
        }
    // res.send(req.body);
    });
});

//GET /auth/signup
//display sign up form
router.get('/signup',function(req,res){
    res.render('auth/signup');
});

//POST /auth/signup
//create new user in database
router.post('/signup',function(req,res){
  console.log('top of signup')
    //do sign up here (add user to database)
    if(req.body.password != req.body.password2){
      req.flash('danger','Passwords must match.');
      res.redirect('/auth/signup');
    } else {
      console.log('before find or create')
      db.user.findOrCreate({
        where:{email: req.body.email},
        defaults:{
          email: req.body.email,
          password: req.body.password,
          name:req.body.name
        }
      }).spread(function(user,created){
        console.log('in spread',created);
        if(created){
          //user is signed up forward them to the home page
          req.flash('success','You\'re signed up.')
          res.redirect('/');
        } else {
          req.flash("danger","A user with that e-mail address already exists.");
          res.redirect('/auth/signup');
        }
      }).catch(function(err){
        console.log('inside catch');
        if(err.message){
          req.flash('danger',err.message);
        }else{
          req.flash('danger','unknown error');
          console.log(err);
        }
        res.redirect('/auth/signup');
      })
    // res.send(req.body);
    }
});

//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
    req.flash('info', 'You have been logged out.');
    req.session.user = false;
    res.redirect('/');
});


module.exports = router;