import React, { Component } from 'react';
import "./MyReviews.css";

import { FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import BookCard from '../../components/BookCard/BookCard';
import { withRouter } from "react-router-dom";
import {withTranslation} from "react-i18next";

class MyReviews extends Component {
    state = {
        reviews: null
    }

    handleGetReviews = async (props) => {
        const userID = localStorage.getItem('userID');
        
        if(this.state.reviews === null){
            const emir = await axios.post('http://localhost:3000/myReviews',{userID: userID});
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
    
    handleReviewClicked = (reviewID) => {
        this.props.history.push({
            pathname: '/viewReview',
            state: { reviewID: reviewID}});
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }
        
        const {t} = this.props;
        this.handleGetReviews();
        let books = null;
        if(this.state.reviews !== null){
            books = (
                <div className='myReviewsBookCardsContainer'>
                    {this.state.reviews.map((review, index) => {
                        return (
                            <BookCard   key={review.reviewID}
                                        className='myReviewsBookCard'
                                        bookName={review.bookName}
                                        bookAuthor={review.bookAuthor}
                                        bookThumbnail={review.bookThumbnail}
                                        click={this.handleReviewClicked.bind(this, review.reviewID)}
                                        />
                        );
                    })}
                </div>
            );
        } else {
            books = (
                <div className='searchResultsBookCardsContainer'>
                    <div className='searchResultsNoResultsSection'>
                        <FaTimesCircle size={148} color='#341f97'/>
                        You don't have any review!😭
                    </div>
                </div>
            );
        }
        
        

        return(
            <div className='myReviewsBackgroundSection'>
                <div className='myReviewsBackgroundFilterSection'>
                    <div className='myReviewsSectionsContainer'>
                        <p className='myReviewsHeader'>{t('navbar.My_Reviews')}</p>
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

export default withTranslation()(withRouter(MyReviews));
