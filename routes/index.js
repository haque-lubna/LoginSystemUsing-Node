const express = require('express');
const router = express.Router();
const User = require('../app/user.model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Log in baby' });
});

module.exports = router;
