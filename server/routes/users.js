var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource for users');
});

function User () {};

User.prototype = {
  //Find user data by email address
  find : function (user, callback) {
    let sql = `SELECT * FROM users WHERE ${field} = ?`;
    pool.query(sql, user, function(err, result) {
      if (err) throw err
      callback(result);
    });
  },

  create : function (body, callback) {
    let pwd = body.password;
    body.password = bcrypt.hashSync(pwd, 10);
    var bind = [];
    for (prop in body){
      bind.push(prop);
    }
    let sql = 'INSERT INTO users(firstname, surname, email, password, birthdate, gender, profilePhotoURL) VALUES (?,?,?,?,?,?,?)';
    pool.query(sql, bind, function(err, lastID){
      if (err) throw err;
      callback(lastID);
    });
  },
  login : function (email, password, callback) {
    this.find(email, function(result){
      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          callback(result);
          return;
        }
      }
      callback(null);
    });
  }
}

module.exports = router;
