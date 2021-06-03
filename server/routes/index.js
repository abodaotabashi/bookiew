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

router.get('/', function(req, res, next) {
  res.send({message:"Hello nothing"})
});

router.get('/home', function(req, res, next) {
  res.send({message:"Hello home"})

});

router.post('/login', async function(req, res, next) {
  //get the payload
  //console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  if(!email || !password) return res.send({response:false, message:"expect an email and a password"})
  //password encryption
  //password = bcrypt.hashSync(pwd, 10);
  //SELECT * from admins where adminEmail=email
  const user = await knex('users').select('*').where({"email":email, "password":password}).first()
  if(user){
    console.log("Successfully logged in")
    return res.send({response: true, user:user})
  }
  console.log("email or password is incorrect");
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
  const userID = req.body.userID
  const user = await knex('users').select('*').where({"userID":userID}).first();
  if(user){
    return res.send({response: true, user: user})
  }else{
    return res.send({response: false, user: null})
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
  let searchedBook = req.body.searchedBook;
  searchedBook = searchedBook.trim();
  searchedBook = "%" + searchedBook + "%";
  const book = await knex('books').select('*').where('bookName', 'like', searchedBook);
  if(book!=null){
    return res.send({response: true, message: book});
  }else{
    return res.send({response: false, message: "no such book!"});
  }
});

router.post('/updateProfile', async function(req,res,next){
  const userID = req.body.userID;
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const photoURL = req.body.photoURL;

  const result = await knex('users').where({'userID': userID}).update(({
    'firstname': firstname,
    'surname': surname,
    'email': email,
    'password': password,
    'profilePhotoURL': photoURL
  }))

  if(result){
    return res.send({response: true, message: "updated!", user:result});
  }else{
    return res.send({response:false, message: "could not update!", user:null});
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
  //console.log(userID);
  const reviews = await knex('reviews').select('*').where({"reviewUserID":userID});
  
  //console.log(reviews);
  if (reviews[0]!=null) {
    //console.log(reviews+" "+userID);
    const books = new Array();
    const displayedBooks = new Array();
    //console.log(reviews[0]);
    var i;
    for (i = 0; i < reviews.length; i++) {
      const book = await knex('books').select('*').where({'bookID':reviews[i].reviewBookID}).first();
      //console.log(book);
      const bookName = book.bookName;
      const bookAuthor = book.author;
      const bookThumbnail = book.bookCoverURL;
      const reviewID = reviews[i].reviewID;
      const displayedBook = {bookName, bookAuthor, bookThumbnail, reviewID};
      books.push(book);
      displayedBooks.push(displayedBook);
      //console.log(displayedBook);
    }
    return res.send({response:true, displayedBooks});
  };
  //console.log("No reviews found")
  return res.send({response:false, message:"No reviews found"});
})

router.post('/getReview', async function(req, res, next) {
  const reviewID = req.body.reviewID;
  const reviews = new Array();
  const reviewA = await knex('reviews').select('*').where({"reviewID":reviewID});
  if (reviewA[0] == null) {
    return res.send({response:false, message:"review not found"});
  } else {
    const review = {
      'text':reviewA[0].reviewText, 
      'date':reviewA[0].reviewDate, 
      'rating':reviewA[0].reviewRating, 
      'reviewerID':reviewA[0].reviewUserID, 
      'reviewBookID':reviewA[0].reviewBookID
    };
    reviews.push(review);
    return res.send({response:true, review})
  }
})

router.post('/getlastReview', async function(req, res, next) {
  const userID = req.body.userID;
  const lastReview = await knex('reviews').select('*').where({"reviewUserID": userID}).orderBy('reviewID', 'desc');
  if (lastReview[0] != null) {
    const lastReviewItem = {'reviewID':lastReview[0].reviewID, 'reviewUserID':lastReview[0].reviewUserID, 'reviewBookID':lastReview[0].reviewBookID, 'reviewText':lastReview[0].reviewText, 'reviewDate':lastReview[0].reviewDate, 'reviewRating':lastReview[0].reviewRating};
    return res.send({response:true, lastReview: lastReviewItem});
  }else{
    return res.send({response:false, message:"No Reviews!"});
  }
})
router.post('/getReviews', async function(req, res, next) {
  const bookID = req.body.bookID;
  //console.log(bookID);
  const reviews = new Array();
  const reviewA = await knex('reviews').select('*').where({"reviewBookID":bookID});
  if (reviewA[0] == null) {
    return res.send({response:false, message:"review not found"});
  } else {
    for (var i = 0;i<reviewA.length; i++) {
      //console.log(reviewA[i]);
      const reviewer = await knex('users').select('*').where({"userID":reviewA[i].reviewUserID})
      //console.log(reviewer);
      const comments = await knex('comments').select('*').where({"commentReviewID": reviewA[i].reviewID})
      //console.log(comments);
      const review = {
        'reviewText':reviewA[i].reviewText, 
        'reviewDate':reviewA[i].reviewDate, 
        'reviewRating':reviewA[i].reviewRating, 
        'reviewerID': reviewer[0].userID, 
        'reviewerIcon': reviewer[0].profilePhotoURL,
        'reviewerName': reviewer[0].firstname + " " + reviewer[0].surname,
        'reviewComments': comments
      };
      //console.log(review);
      reviews.push(review);
    }
    //console.log(reviews);
    return res.send({response:true, reviews})
  }
})

router.post('/getReviewOfUser', async function(req, res, next) {
  const reviewerID = req.body.reviewerID;
  const reviews = new Array();
  const reviewA = await knex('reviews').select('*').where({"reviewUserID":reviewerID});
  if (reviewA[0] == null) {
    return res.send({response:false, message:"review not found"});
  } else {
    const review = {
      'text':reviewA[0].reviewText, 
      'date':reviewA[0].reviewDate, 
      'rating':reviewA[0].reviewRating, 
      'reviewerID':reviewA[0].reviewUserID, 
      'reviewBookID':reviewA[0].reviewBookID
    };
    reviews.push(review);
    return res.send({response:true, review})
  }
})

router.post('/getUser', async function(req, res, next) {
  const userID = req.body.userID;
  const userA = await knex('users').select('*').where({'userID':userID});
  if (!userA) {
    return res.send({response:false, message:"user not found"});
  }else{
    const user = {
      'name':userA[0].firstname +' '+ userA[0].surname, 
      'id': userA[0].userID, 
      'icon':userA[0].profilePhotoURL
    };
    return res.send({response:true, user});
  }
})

router.post('/getComments', async function (req, res, next) {
  const reviewID = req.body.reviewID;
  const comments = new Array();
  const commentsA = await knex('comments').select('*').where({'commentReviewID':reviewID});
  if (commentsA[0]==null) {
    return res.send({response:false, comments:null});
  } else {
    for(let i=0; i<commentsA.length; i++) {
      const user = await knex('users').select('*').where({'userID':commentsA[i].commentUserID});
      comments.push({
        'commentText': commentsA[i].commentText,
        'commentDate':commentsA[i].commentDate ,
        'commentID': commentsA[i].commentID,
        'commenterName':user[0].firstname + " " + user[0].surname,
        'commenterIcon':user[0].profilePhotoURL
      })
    }
    return res.send({response:true, comments: comments});
  }
})

router.post('/getBook', async function(req, res, next) {
  const bookID = req.body.bookID;
  //console.log(bookID);
  const bookA = await knex('books').select('*').where({'bookID':bookID});
  if (!bookA) { 
    return res.send({response:false, message:'no books found'}); 
  } else {
    const book = {
      'bookName': bookA[0].bookName, 
      'bookAuthor': bookA[0].author,
      'bookThumbnail': bookA[0].bookCoverURL,
      'bookPublisher':bookA[0].publisher,
      'bookPublishingYear': bookA[0].publishingYear,
      'bookCategory': bookA[0].category,
      'bookSubject': bookA[0].subject,
      'bookLanguage': bookA[0].language
    };
    return res.send({response: true, book});
  }
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

router.post('/recommend', async function(req, res, next) {
  console.log(req.body);
  const suggestionUserID = req.body.suggestionUserID;
  const suggestionBook = req.body.suggestionBook;
  const suggestionAuthor = req.body.suggestionAuthor;
  const suggestionPublishingYear = req.body.suggestionPublishingYear;
  const suggestionNote = req.body.suggestionNote;

  if (!suggestionUserID || !suggestionBook || !suggestionAuthor || !suggestionPublishingYear) {return res.send({response:false, message:"expect at least book name, author and publishing year!"})};
  const suggestedBook = await knex('suggestions').select('*').where({"suggestionBook":suggestionBook, "suggestionAuthor": suggestionAuthor, "suggestionPublishingYear": suggestionPublishingYear}).first()
  if(suggestedBook){
    console.log(suggestedBook);
    return res.send({response: false, message:"this book exists already!"})
  }
  const result =await knex('suggestions').insert({
    suggestionUserID: suggestionUserID,
    suggestionBook: suggestionBook,
    suggestionAuthor: suggestionAuthor,
    suggestionPublishingYear: suggestionPublishingYear,
    suggestionNote: suggestionNote
  });
  if (result) {
    return res.send({response:true, message:"successfully recommended"+result})
  }
  return res.send({response:false, message:"something went wrong in recommendation!"})
});

router.post('/deleteReview', async function(req, res, next) {
  const reviewID = req.body.reviewID;
  console.log(reviewID);
  const deleteA = await knex('reviews').where('reviewID', reviewID).del();
  if (!deleteA) {return res.send({response:false, message:'cannot delete review'})}
  if (req.body.hasComments) {
    const deleteB = await knex('comments').where('commentReviewID', reviewID).del();
    if (!deleteB) {return res.send({response:false, message:'cannot delete comments'})}
  } else {
    console.log('Successfully deleted');
    return res.send({response:true});
  }
});

router.post('/editReview', async function(req, res, next) {
  console.log(req.body.reviewID);
  const reviewID = req.body.reviewID;
  const reviewText = req.body.reviewText;
  const result = await knex('reviews').where({'reviewID': reviewID}).update(({
    'reviewText': reviewText
  }));
  if (!result) {
    return res.send({response:false, message:'error by updating the review'});
  } else {
    return res.send({response:true, message:'Successfully updated'});
  }
});

module.exports = router;
