var passport = require('passport');
var User = require('../models/User');

// List all users
var listUsers = function(req, res, next) {
  User.find(function(error, users) {
    if (error) res.json({message: 'Could not find any user'});
    res.render('./users/index', {
      title: "Here are our users",
      users: users,
      user: req.user
    });
  });
};

// Create a new user
var createUser = function(req, res) {
  User.register(new User(
    {
      username: req.body.username,
      zipcode: req.body.zipcode
    }), req.body.password, function(err, user) {
      if (err) return res.render('users/new',
        {user: user});
        passport.authenticate('local')(req, res, function() {
          req.session.save(function(err) {
            if (err) {
              return next(err);
            }
            res.redirect('/users/' + req.user.id);
        });
     });
  });
};

// Render Edit user Form
var editUserView = function(req, res, next) {
  var id = req.params.id;
  User.findById({_id: id}, function(error, user) {
    // delete this comment is the code works
    // if(error) res.json({message: 'Could not edit user because: ' + error});
    // res.render(
    //   'users/:id', {
    //     user: user
    //   }
    // )
    if(error) res.json({message: 'Could not edit user because: ' + error});
    // API
    // res.json({user: user});
    res.render('./users/edit', {title: "Edit user", user: user});
   });
}

// UPDATE user PAGE
var editUser = function(req, res, next) {
  var id = req.params.id;

  User.findById({_id: id}, function(error, user) {
    if (error) res.json({message: 'Could not find user because ' + error});

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password= req.body.password;
    if (req.body.zipcode) user.zipcode = req.body.zipcode;

    user.save(function(error) {
      if (error) res.json({message: 'user successfully updated'});
      res.redirect('/users/' + id);
    });
  });
};

// Show a user
var showUser = function(req, res, next) {
  var id = req.params.id;

  User.findById({_id: id}, function(error, user) {
    if(error) res.json({message: 'Could not find user because: ' + error});
    res.render(
      './users/show', {
        user: req.user
      }
    )
    // API
    // res.json({user: user});
   });
}

// Remove a user
var removeUser = function(req, res, next) {
  var id = req.params.id;

  User.remove({_id: id}, function(error) {
    if (error) res.json({message: 'Could not delete user because ' + error});

    res.json({message: 'user successfully deleted'});
  });
};

module.exports = {
   listUsers:     listUsers,
   createUser:    createUser,
   editUserView:  editUserView,
   editUser:      editUser,
   showUser:      showUser,
   removeUser:    removeUser
}
