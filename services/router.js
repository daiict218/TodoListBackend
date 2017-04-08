const passport = require('passport');

const AuthenticationController = require('../controllers/authentication_controller');
const TodosController = require('../controllers/todos_controller');
const passportService = require('./passport');

//This line should come just before router
var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});

var router = require('express').Router();

function protected(req, res, next){
  res.send('Here is the secret');
}

router.route('/signup')
  .post(AuthenticationController.signup);

router.route('/signin')
  .post([requireLogin, AuthenticationController.signin]);

//todos routes


router.route('/users/:user_id/todos')
  .post(requireAuth, TodosController.create)
  .get(requireAuth, TodosController.index);

module.exports = router;
