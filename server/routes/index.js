const { response } = require('express');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const crypto = require('crypto');
//const bcrypt = require('bcrypt');

const CLIENT_ID = '262720466307-nt8db116tqact0u2j83fp3h0qbvul9e0.apps.googleusercontent.com';
const CLIENT_SECRET = 'YTHbS_U8IzUgQJyCbkg02Z1r';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04rSQ3MznSGKbCgYIARAAGAQSNwF-L9IrWMTPl9ymwnA_G6TGSNqODdrgxnINZu9uxLLpuGwqg_6n86XQyxx2qUANOz-rvFOEMds';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

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
  const email = req.body.email;
  const user = await knex('users').select('*').where({"email":email})
  if (user) {
    if (!user[0].hasToken || user[0].hasToken === 0) {
        try {
          let token = null;
          crypto.randomBytes(20, (err, buffer)=> {
            if(err){
              console.log(err);
              return res.send({response:false, message:"something went wrong "})
            } else {
              token = buffer.toString("hex");
            }
          })
          const accessToken = await oAuth2Client.getAccessToken();
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'bookiew.website@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
          });
          const mailOptions={
            from: 'Bookiew - no-reply <no-reply@bookiew.com>',
            to: email,
            subject: 'Bookiew - Reset Password',
            html:`
                <h2>Hello ${user[0].firstname} </h2>
                <h3>To reset your password please follow this <a href="http://127.0.0.1:3000/resetPassword/${token}" target="_">link</a>!</h3>
                <p>Cheers,</p>
                <p>Bookiew Team</p> 
                `
          }
          console.log("token = ", token);
          const result = await transporter.sendMail(mailOptions);
          console.log("Email Sent! ", result);
          const tokenSent = await knex('users')
                                  .where('userID', '=', user[0].userID)
                                  .update({ hasToken: 1, resetToken: token})
                                  .decrement({
                                    balance: 50,
                                  })
                                  .clearCounters()
          return res.send({response:true, message:"Reset link sent to your email address"}); 
        } catch (error) {
          console.log(error.message);
          return res.send({response:false, message:"something went wrong "})
        }
    } else {
      return res.send({response:false, message:"Reset link was already sent!"});
    }
  } else {
    console.log("User doesn't exist!");
    return res.send({response:false, message:"User doesn't exist!"})
  }
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
    let i;
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
      'date':(reviewA[0].reviewDate.getDate() + "/" + (reviewA[0].reviewDate.getMonth()+1) + "/" + reviewA[0].reviewDate.getFullYear()), 
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
    const lastReviewItem = {
      'reviewID':lastReview[0].reviewID, 
      'reviewUserID':lastReview[0].reviewUserID, 
      'reviewBookID':lastReview[0].reviewBookID, 
      'reviewText':lastReview[0].reviewText, 
      'reviewDate':(lastReview[0].reviewDate.getDate() + "/" + (lastReview[0].reviewDate.getMonth()+1) + "/" + lastReview[0].reviewDate.getFullYear()), 
      'reviewRating':lastReview[0].reviewRating};
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
    for (let i = 0;i<reviewA.length; i++) {
      //console.log(reviewA[i]);
      const reviewer = await knex('users').select('*').where({"userID":reviewA[i].reviewUserID})
      //console.log(reviewer);
      const comments = await knex('comments').select('*').where({"commentReviewID": reviewA[i].reviewID})
      //console.log(comments);
      const review = {
        'reviewID':reviewA[i].reviewID,
        'reviewText':reviewA[i].reviewText, 
        'reviewDate':(reviewA[i].reviewDate.getDate() + "/" + (reviewA[i].reviewDate.getMonth()+1) + "/" + reviewA[i].reviewDate.getFullYear()), 
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
      'date': (reviewA[0].reviewDate.getDate() + "/" + (reviewA[0].reviewDate.getMonth()+1) + "/" + reviewA[0].reviewDate.getFullYear()) , 
      'rating':reviewA[0].reviewRating, 
      'reviewerID':reviewA[0].reviewUserID, 
      'reviewBookID':reviewA[0].reviewBookID
    };
    reviews.push(review);
    return res.send({response:true, review})
  }
})

router.post('/getRatingOfUser', async function(req, res, next) {
  console.log(req.body);
  const userID = req.body.userID;
  const reviewID = req.body.reviewID;
  const result = await knex('ratings').select('*').where({'ratingUserID':userID, 'ratingReviewID': reviewID});
  if (result[0] == null) {
    return res.send({response:false})
  } else {
    const rating = result[0].score;
    return res.send({response:true, rating:rating});
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
        'commentDate': (commentsA[i].commentDate.getDate() + "/" + (commentsA[i].commentDate.getMonth()+1) + "/" + commentsA[i].commentDate.getFullYear()) ,
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
      'bookLanguage': bookA[0].bookLanguage,
      'bookID': bookA[0].bookID
    };
    return res.send({response: true, book});
  }
})

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

router.post('/addReview', async function(req, res, next) {
  const reviewText = req.body.review;
  const bookID = req.body.bookID;
  const userID = req.body.userID;
  const reviewDate = req.body.reviewDate;
  const result =await knex('reviews').insert({
    reviewText: reviewText,
    reviewBookID: bookID,
    reviewUserID: userID,
    reviewDate: reviewDate
  });
  if (result) {
    return res.send({response:true, message:"successfully added "})
  }
  return res.send({response:false, message:"something went wrong "})
})

router.post('/addComment', async function(req, res, next) {
  const commentText = req.body.commentText;
  const reviewID = req.body.reviewID;
  const userID = req.body.userID;
  const commentDate = req.body.commentDate;
  const result =await knex('comments').insert({
    commentText: commentText,
    commentReviewID: reviewID,
    commentUserID: userID,
    commentDate: commentDate
  });
  if (result) {
    return res.send({response:true, message:"successfully added "})
  }
  return res.send({response:false, message:"something went wrong "})
})

router.post('/updateRating', async function (req, res, next) {
  const reviewID = req.body.reviewID;
  const userID = req.body.userID;
  const newRating = req.body.newRating;
  const result = await knex('ratings').select('*').where({'ratingUserID':userID, 'ratingReviewID': reviewID});
  if (result[0] == null) {
    const result1 = await knex('ratings').insert({
      'ratingUserID': userID,
      'ratingReviewID': reviewID,
      'score': newRating
    })
    if (!result1) {
      return res.send({response:false})
    } else {
      const ratings = await knex('ratings').select('*').where({'ratingReviewID':reviewID})
      let toplam = 0;
      let newScore = 0;
      if (ratings[0] !== null){
        for (let i=0; i < ratings.length; i++) {
          toplam = toplam + ratings[i].score;
        }
        newScore = toplam/ratings.length;
      }
      const result3 = await knex('reviews').where({'reviewID': reviewID}).update(({
        'reviewRating': newScore
      }))
      return res.send({newScore: newScore, response: true})
    }
  } else {
    const result2 = await knex('ratings').where({'ratingUserID':userID, 'ratingReviewID': reviewID}).update(({
      'score': newRating
    }));
    if (!result2) {
      return res.send({response:false})
    } else {
      const ratings = await knex('ratings').select('*').where({'ratingReviewID':reviewID})
      let toplam = 0;
      let newScore = 0;
      if (ratings[0] !== null){
        for (let i=0; i < ratings.length; i++) {
          toplam = toplam + ratings[i].score;
        }
        newScore = toplam/ratings.length;
      }
      const result3 = await knex('reviews').where({'reviewID': reviewID}).update(({
        'reviewRating': newScore
      }))
      return res.send({newScore: newScore, response: true})
    }
  }
})

router.post('/deleteRecommendation', async function(req, res, next) {
  const sugID = req.body.sugID;
  const deleted = await knex('suggestions').where('suggestionID', sugID).del();
  if (!deleted) {
    return res.send({response:false, message:'cannot delete suggestion'})
  }else {
    console.log('Suggestion successfully deleted');
    return res.send({response:true});
  }
});

router.post('/getRecommendations', async function(req, res, next) {
  const recommendations = new Array();
  const recommendationResults = await knex('suggestions').select('*');
  if (recommendationResults[0] == null) {
    return recommendationResults.send({response:false, message:"No Recommendations found!"});
  } else {
    for (let i = 0; i<recommendationResults.length; i++) {
      const user = await knex('users').select('*').where({"userID":recommendationResults[i].suggestionUserID});
      const recommendation = {
        'suggestionBook':recommendationResults[i].suggestionBook, 
        'suggestionAuthor':recommendationResults[i].suggestionAuthor, 
        'suggestionPublishingYear':recommendationResults[i].suggestionPublishingYear,  
        'suggestionNote':recommendationResults[i].suggestionNote,  
        'suggestionID':recommendationResults[i].suggestionID, 
        'suggestionUserID':recommendationResults[i].suggestionUserID, 
        'suggestionUserName':user[0].firstname + " " + user[0].surname,
      };
      recommendations.push(recommendation);
    }
    return res.send({response:true, recommendations: recommendations});
  }
})

module.exports = router;