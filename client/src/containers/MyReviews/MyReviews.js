import React, { Component } from 'react';
import "./MyReviews.css";

import BookCard from '../../components/BookCard/BookCard';

import ThumbnailTest from "../../assets/images/thumbnailtest.png"

class MyReviews extends Component {
    state = {
        reviews: null,
        clickedReviewBookName: '',
        clickedReviewBookAuthor: ''
    }

    render(){
        return(
            <div className='myReviewsBackgroundSection'>
                <div className='myReviewsBackgroundFilterSection'>
                    <div className='myReviewsSectionsContainer'>
                        <p className='myReviewsHeader'>My Reviews</p>
                        <div className='myReviewsBreaklineContainer' >
                            <hr className='myReviewsBreakline' />
                        </div>
                        <div className='myReviewsBookCardsContainer'>
                            <BookCard   className='myReviewsBookCard'
                                        bookName='Book 1'
                                        bookAuthor='Bookiew Inc.'
                                        bookThumbnail={ThumbnailTest}
                                        />
                            <BookCard   className='myReviewsBookCard'
                                        bookName='Book 2'
                                        bookAuthor='Betül'
                                        bookThumbnail={ThumbnailTest}
                                        />
                            <BookCard   className='myReviewsBookCard'
                                        bookName='Book 3'
                                        bookAuthor='Fatma'
                                        bookThumbnail={ThumbnailTest}
                                        />
                            <BookCard   className='myReviewsBookCard'
                                        bookName='Book 4'
                                        bookAuthor='Mahasin'
                                        bookThumbnail={ThumbnailTest}
                                        />
                            <BookCard   className='myReviewsBookCard'
                                        bookName='Book 5'
                                        bookAuthor='Nazlı'
                                        bookThumbnail={ThumbnailTest}
                                        />
                            <BookCard   className='myReviewsBookCard'
                                        bookName='Bookiew'
                                        bookAuthor='Sena'
                                        bookThumbnail={ThumbnailTest}
                                        />
                            <BookCard   className='myReviewsBookCard'
                                        bookName='Book 6'
                                        bookAuthor='Abdurrahman'
                                        bookThumbnail={ThumbnailTest}
                                        />
                            <BookCard   className='myReviewsBookCard'
                                        bookName='Book 7'
                                        bookAuthor='Betül'
                                        bookThumbnail={ThumbnailTest}
                                        />
                            <BookCard   className='myReviewsBookCard'
                                        bookName='Book 8'
                                        bookAuthor='Fatma'
                                        bookThumbnail={ThumbnailTest}
                                        />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyReviews;
