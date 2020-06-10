const express = require('express');
const router = express.Router();
const User = require('../app/user.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const isValidEmail = (email) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,63})+$/.test(email))
        return true;
    else return false;
}
// /api/login
router.post('/login', function(req, res, next) {
    const { email, password } = req.body;
    if(isValidEmail(email) == false){
      res.send({ err: 'not a valid email!' });
    }
    else{
      User.findOne({ email: email })
      .then(function (data) {
          console.log(data);
          if(data) {
              bcrypt.compare(password, data.password).then(result => {
                if(result)
                  res.send({ email });
                else
                  res.send({ err: 'does not match' });
              }).catch(err => {
                res.send({ err: 'does not match' });
              })
          } else {
              res.send({ err:'The email and/or password you specified are not correct!' });
          }
      })
      .catch(function (err) {
          console.log(err);
          res.send({ err: 'something wents wrong!' });
      })
    }


});

router.post('/register', function(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password);
    console.log(isValidEmail(email));
    if(isValidEmail(email) == false){
      res.send('please enter a valid email!');
    }
    else{
      User.findOne({ email: email })
      .then(function (data) {
          if(data && data.password) {
              res.send({err: 'duplicate email'});
          } else {
            bcrypt.hash(password, saltRounds).then(async (hash) => {
              await User.create({
                email,
                password: hash
              });
              res.send({message: 'success'});
            });
          }
      })
      .catch(function (err) {
          console.log(err);
          res.send('The email and/or password you specified are not correct!');
      })
    }


});

module.exports = router;
