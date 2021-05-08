const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');

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
  res.send({message:"Hello nothing"})
});

router.get('/home', function(req, res, next) {
  res.send({message:"Hello home"})

});


router.post('/login', async function(req, res, next) {
  //get the payload
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  if(!email || !password) return res.send({response:false, message:"expect an email and a password"})
  //password encryption
  //password = bcrypt.hashSync(pwd, 10);
  //SELECT * from users where email=email
  const user = await knex('users').select('*').where({"email":email, "password":password}).first()
  if(user){
    return res.send({response: true, message:"you are logged in"})
  }
  return res.send({response:false, message:"email or password is incorrect"})
});

router.post('/logout', async function (req, res, next) {
  res.render('LoginRegisterForm');
})



router.post('/register', async function(req, res, next) {
  console.log(req.body);
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const birthdate = req.body.birthdate;
  if (!email || !password) {return res.send({response:false, message:"expect an email and a password"})};
  const user = await knex('users').select('*').where({"email":email, "password":password}).first()
  if(user){
    console.log(user.firstname);
    return res.send({response: false, message:"this email has been already registered"})
  }
  const result =await knex('users').insert({
    email: email,
    password: password,
    firstname: firstname,
    surname: surname,
    gender: gender,
    birthDate: birthdate
  });
  if (result) {
    return res.send({response:true, message:"successfully registered "+result})
  }
  return res.send({response:false, message:"something went wrong "})
});
module.exports = router;


