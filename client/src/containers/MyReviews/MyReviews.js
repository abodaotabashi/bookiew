import React, { Component } from 'react';
import "./MyReviews.css";

import BookCard from '../../components/BookCard/BookCard';

class MyReviews extends Component {
    state = {
        reviews: this.props.reviews
    }

    handleReviewClicked = (reviewIndex) => {
        //TODO
    }

    render(){

        let books = null;
        books = (
            <div className='myReviewsBookCardsContainer'>
                {this.state.reviews.map((review, index) => {
                    return (
                        <BookCard   key={review.id}
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
