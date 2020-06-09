const express = require('express');
const router = express.Router();
const User = require('../app/user.model');

const isValidEmail = (email) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,63})+$/.test(email))
        return true;
    else return false;
}
// /api/login
router.post('/login', function(req, res, next) {
    console.log('query', req.query);
    console.log('body', req.body);
    const { email, password } = req.body;
    console.log(email, password);
    console.log(isValidEmail(email));
    if(isValidEmail(email) == false){
      res.send('please enter a valid email!');
    }
    else{
      User.findOne({ email: email })
      .then(function (data) {
          console.log(data);
          if(data && data.password === password) {
              // res.send('Success');
              res.render('landing');
          } else {
              res.send('The email and/or password you specified are not correct!');
          }
      })
      .catch(function (err) {
          console.log(err);
          res.send('The email and/or password you specified are not correct!');
      })
    }


});

module.exports = router;
