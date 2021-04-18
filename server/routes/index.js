var express = require('express');
var router = express.Router();

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


router.post('/login', async function(req, res, next) {
  //get the payload
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  if(!email || !password) return res.send({response:false, message:"expect an email and a password"})
  //SELECT * from admins where adminEmail=email
  const admin = await knex('admins').select('*').where({"adminEmail":email, "adminPassword":password}).first()
  
  if(admin){
    return res.send({response: true, message:"you are logged in"})
  }

  return res.send({response:false, message:"email or password is incorrect"})
});



module.exports = router;
