var express = require('express');
var router = express.Router();
 var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken');

 router.use(bodyParser.urlencoded({ extended: false}));
 router.use(bodyParser.json());
 
var User = require('../models/Usuarios');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.post('/login', function(req, res) {

  const { email, password } = req.body;
  User.findOne({ email: email }, function (err, user) {

    console.log(user)
    if (err) return res.status(500).send('Erro no servidor.');
    if (!user) return res.status(404).send('Usuário não encontrado.');
    
     // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
     // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    // return the information including token as JSON
    res.status(200).send({ id: user._id, auth: true, token: token });
  });
  
});
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/registrar', function(req, res) {
  const { name, email} = req.body;
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.findOne({email: email, name: name}, function(userObj){
      if(userObj){
        return res.status(409).send("Usuário já existe no sistema");
      }  else{
        User.create({
          name : req.body.name,
          email : req.body.email,
          password : hashedPassword
        },
    
        function (err, user) {
          if (err) return res.status(500).send("Ocorreu um problema ao registrar o usuário.")
    
          // if user is registered without errors
          // create a token
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
        }); 
      }
    });   
  });

  router.get('/me', VerifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("Ocorreu um problema ao procurar o usuário.");
      if (!user) return res.status(404).send("Usuário não encontrado.");
      res.status(200).send(user);
    });
  
  });
  module.exports = router;
  /*
  referencia do JWT
  https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
  */