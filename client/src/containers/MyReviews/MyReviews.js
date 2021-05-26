import React, { Component } from 'react';
import "./MyReviews.css";

import axios from 'axios';
import {getUser} from '../../session'
import BookCard from '../../components/BookCard/BookCard';

class MyReviews extends Component {
    state = {
        reviews: null
    }

    handleGetReviews = async (props) => {
        const user = getUser();
        if(this.state.reviews === null){
            const emir = await axios.post('http://localhost:3000/myReviews',{userID:user.userID});
            let reviews = [];
            if (emir.data.response) {
                const myReviews = emir.data.displayedBooks;
                for ( let i = 0; i < myReviews.length; i++ ) {
                    reviews.push(myReviews[i]);
                }
                this.setState({ reviews : reviews });
            }
        }
        
    }
    
    handleReviewClicked = (reviewIndex) => {
        //TODO
    }

    render(){
        this.handleGetReviews();
        let books = null;
        if(this.state.reviews !== null){
            books = (
                <div className='myReviewsBookCardsContainer'>
                    {this.state.reviews.map((review, index) => {
                        console.log(review.bookThumbnail)
                        return (
                            <BookCard   key={review.reviewID}
                                        className='myReviewsBookCard'
                                        bookName={review.bookName}
                                        bookAuthor={review.bookAuthor}
                                        bookThumbnail={review.bookThumbnail}
                                        click={this.handleReviewClicked.bind(this, index)}
                                        />
                        );
                    })}
                </div>
            );
        }
        
        

        return(
            <div className='myReviewsBackgroundSection'>
                <div className='myReviewsBackgroundFilterSection'>
                    <div className='myReviewsSectionsContainer'>
                        <p className='myReviewsHeader'>My Reviews</p>
                        <div className='myReviewsBreaklineContainer' >
                            <hr className='myReviewsBreakline' />
                        </div>
                        <div className='myReviewsBookCardsContainer'>
                            {books}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyReviews;
