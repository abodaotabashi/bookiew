const { response } = require('express');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
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

router.post('/login', async function(req, res, next) {
  const email = req.body.email
  const password = req.body.password
  const user = await knex('admins').select('*').where({"adminEmail":email, "adminPassword":password}).first()
  if(user){
    console.log("successfully logged in")
    return res.send({response: true, user:user})
  } else {
    console.log("email or password is incorrect");
    return res.send({response:false, message:"email or password is incorrect"})
  }
});

router.post('/getSugNo', async function(req, res, next) {
  const suggestions = await knex('suggestions').select('*');
  if (!suggestions) {return res.send({response:false, message: 'no suggestions found'})}
  const lengthOfSug = suggestions.length;
  return res.send({resposne:true, lengthOfSug});
});

router.post('/addBook', async function(req, res, next) {
  const bookName = req.body.bookName;
  const author = req.body.author;
  const yearOfPub = req.body.yearOfPub;
  const publisher = req.body.publisher;
  const category = req.body.category;
  const subject = req.body.subject;
  const language = req.body.language;
  const coverURL = req.body.coverURL;
  const result = await knex('books').insert({
    bookName: bookName,
    author: author,
    publisher: publisher,
    publishingYear: yearOfPub,
    bookLanguage: language,
    category: category,
    subject: subject,
    bookCoverURL : coverURL
  });
  if (result) {return res.send({response:true, message:'book added successfully'});}
  return res.send({response:false, message:'something went wromg'});
});

router.post('/deleteBook', async function(req, res, next) {
  const bookID = req.body.bookID;
  const reviews = await knex('reviews').select('*').where('reviewBookID', bookID);
  if (reviews) {
    for (var i = 0; i < reviews.length; i++){
      const reviewID = reviews[i].reviewID;
      const deleteComments = await knex('comments').where('commentReviewID', reviewID).del();
      const deleteReviews = await knex('reviews').where('reviewID', reviewID).del();
    }
  }
  const deleteBook = await knex('books').where('bookID', bookID).del();
  if(deleteBook){return res.send({response:true, message:'success'})}
  return res.send({response:false});
})
//       
router.post('/updateBook', async function(req, res, next) {
  const result = await knex('books').where({'bookID': req.body.bookID}).update(({
    'bookName': req.body.bookName,
    'author': req.body.author,
    'publisher': req.body.publisher,
    'publishingYear': req.body.pubYear,
    'subject': req.body.subject,
    'category': req.body.category,
    'bookLanguage': req.body.language,
    'bookCoverURL': req.body.coverURL
  }));
  if (result) {return res.send({response:true, message:'success'});}
  return res.send({response:false});
})

module.exports = router;