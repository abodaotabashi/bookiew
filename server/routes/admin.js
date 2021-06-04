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
router.post('/getSugNo', async function(req, res, next) {
  console.log(req.body.message);
  const suggestions = await knex('suggestions').select('*').where({'suggestionUserID':1});
  console.log(suggestions);
  if (!suggestions) {return res.send({response:false, message: 'no suggestions found'})}
  const lengthOfSug = suggestions.length;
  console.log(lengthOfSug);
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

module.exports = router;