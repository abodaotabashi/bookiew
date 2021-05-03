var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { default: LoginRegisterForm } = require('../../client/src/containers/LoginRegisterForm/LoginRegisterForm');

const knex = require('knex')({
  client: 'mysql',
  version: '5.7',
  connection: {
    host : 'pharzan.c6enfwnyrdpp.eu-central-1.rds.amazonaws.com',
    user : 'beatle',
    password : 'beidas',
    database : 'bookiew'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({message:"Hello world"})
});

router.get('/home', function(req, res, next) {
  res.render('Home');
  return;
});


router.post('/login', async function(req, res, next) {
  //get the payload
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  if(!email || !password) return res.send({response:false, message:"expect an email and a password"})
  //password encryption
  //password = bcrypt.hashSync(pwd, 10);
  //SELECT * from admins where adminEmail=email
  const admin = await knex('admins').select('*').where({"adminEmail":email, "adminPassword":password}).first()
  if(admin){
    //return res.send({response: true, message:"you are logged in"})
    res.redirect('/home');
  }
  return res.send({response:false, message:"email or password is incorrect"})
});

router.post('/logout', async function (req, res, next) {
  res.render('LoginRegisterForm');
})



router.post('/register', async function(req, res, next) {
  const firstname = req.body.firstname;
});
module.exports = router;


