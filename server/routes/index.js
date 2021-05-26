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
  //SELECT * from admins where adminEmail=email
  const user = await knex('users').select('*').where({"email":email, "password":password}).first()
  if(user){
    return res.send({response: true, user:user})
  }
  return res.send({response:false, message:"email or password is incorrect"})
});

router.post('/register', async function(req, res, next) {
  console.log(req.body);
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const birthdate = req.body.birthdate;
  if (!email || !password) {return res.send({response:false, message:"expect an email and a password"})};
  const user = await knex('users').select('*').where({"email":email}).first()
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

router.post('/editProfile', async function(req, res, next){
  const email = req.body.email
  const user = await knex('users').select('*').where({"email":email}).first();
  if(user){
    return res.send({response: true, user: user})
  }
});

router.post('/forgotPassword', async function(req, res, next) {
  console.log(req.body);
  const email = req.body.email;
  const user = await knex('users').select('*').where({"email":email})
  if (user) {
    console.log(user);
    if (!user.hasHash) {
      const message = {
        from: process.env.GOOGLE_USER,
        //to: email //when we want to send the link to user's actual email address
        to: process.env.GOOGLE_USER, 
        subject: 'Bookiew - Reset Password',
        html:`
            <h3>Hello ${user.firstname} </h3>
            <p>To reset your password please follow this link: <a target="_" href="localhost:3000/resetPassword/${user.userID}">Reset Password Link</a></p>
            <p>Cheers,</p>
            <p>Bookiew Team</p> 
            `
      }
      console.log('message created');
      if (sendEmail(message)) {
        console.log('message sent');
        const hashSent = await knex('users')
                                .where('userID', '=', user.userID)
                                .update({ hasHash: 1})
                                .decrement({
                                  balance: 50,
                                })
                                .clearCounters()
        return res.send({response:true, message:"Reset link sent to your email address"})
      }
      return res.send({response:false, message:"something went wrong "})
    } else {return res.send({response:false, message:"Reset link was allready sent!"})}
  }
  console.log('User doesnt exist');
  return res.send({response:false, message:"User doesn't exist!"})
});

router.post('/search', async function(req, res, next){
  const searchedBook = req.body.searchedBook;
  const book = await knex('books').select('*').where({'bookName': searchedBook});
  if(book!=null){
    return res.send({response: true, message: book});
  }else{
    return res.send({response: false, message: "no such book!"});
  }
});

router.post('/resetPassword', async function(req, res, next) {
  const password = req.body.password;
  const hash = req.body.hash;
  const result = await knex('users')
                        .where('userID', '=', hash)
                        .update({ password: password})
                        .decrement({
                          balance: 50,
                        })
                        .clearCounters()
  const result1 = await knex('users')
                        .where('userID', '=', hash)
                        .update({ hasHash: 0})
                        .decrement({
                          balance: 50,
                        })
                        .clearCounters()
  return res.send({response:true, message:"Password has been changed"})
})

router.post('/myReviews', async function(req, res, next) {
  const userID = req.body.userID;
  console.log(userID);
  const reviews = await knex('reviews').select('*').where({"reviewUserID":userID});
  console.log(reviews);
  if (reviews[0]!=null) {
    console.log(reviews+" "+userID);
    const books = new Array();
    const displayedBooks = new Array();
    console.log(reviews[0]);
    var i;
    for (i = 0; i < reviews.length; i++) {
      const book = await knex('books').select('*').where({'bookID':reviews[i].reviewBookID}).first();
      console.log(book);
      const bookName = book.bookName;
      const bookAuthor = book.author;
      const bookThumbnail = book.bookCoverURL;
      const reviewID = reviews[i].reviewID;
      const displayedBook = {bookName, bookAuthor, bookThumbnail, reviewID};
      books.push(book);
      displayedBooks.push(displayedBook);
      console.log(displayedBook);
    }
    return res.send({response:true, displayedBooks});
  };
  console.log("No reviews found")
  return res.send({response:false, message:"No reviews found"});
})

router.post('/getReview', async function(req, res, next) {
  const reviewID = req.body.reviewID;
  const review = new Array();
  const reviewA = await knex('reviews').select('*').where({"reviewID":reviewID}).first();
  if (reviewA[0]=null) {
    return res.send({response:false, message:"review not found"});
  }
  console.log(review);
  const reviewText = reviewA.reviewText;
  review.push({'text':reviewText});
  review.push({'date':reviewA.reviewDate});
  review.push({'rating':reviewA.reviewRating});
  review.push({'reviewerID':reviewA.reviewUserID});
  return res.send({response:true, review})
})

router.post('/getUser', async function(req, res, next) {
  const userID = req.body.userID;
  const user = new Array();
  const userA = await knex('users').select('*').where({'userID':userID}).first();
  if (!userA) {return res.send({response:false, message:"user not found"});}
  console.log(userA);
  user.push({'name':userA.firstname + " "+ userA.surname});
  user.push({'id': userA.userID});
  user.push({'icon':userA.profilePhotoURL});
  return res.send({response:true, user});
})

router.post('/getComments', async function (req, res, next) {
  const reviewID = req.body.reviewID;
  const comments = new Array();
  const commentsA = await knex('comments').select('*').where({'commentReviewID':reviewID});
  if (commentsA[0]==null) {return res.send({response:false, message:'no comments found'});}
  for (var i=0;i<commentsA.length;i++) {
    const user = await knex('users').select('*').where({'userID':commentsA[i].commentUserID}).first();
    comments.push({
      'commentText': commentsA[i].commentText,
      'commentDate':commentsA[i].commentDate ,
      'commentID': commentsA[i].commentID,
      'commenterName':user.firstname + " " + user.surname,
      'commenterIcon':user.profilePhotoURL
    })
  }
  return res.send({response:true, comments});
})

router.post('/getBook', async function(req, res, next) {
  const bookID = req.body.bookID;
  const book = new Array();
  const bookA = await knex('books').select('*').where({'bookID':bookID});
  if (!bookA) { return res.send({response:false, message:'no books found'}); }
  book.push({'bookName': bookA.bookName, 'bookAuthor': bookA.author,'bookThumbnail': bookA.bookCoverURL});
  return res.send({response: true, book});
})

function sendEmail(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD
      }
    })

    transporter.sendMail(message, function(err, info) {
      if (err) {
        rej(err)
      } else {
        res(info)
      }
    })
  })
}
module.exports = router;


