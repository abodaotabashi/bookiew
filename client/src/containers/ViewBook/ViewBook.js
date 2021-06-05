import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {withTranslation} from "react-i18next";
import axios from 'axios';

import ViewBookUserReviewCard from '../../components/ViewBookReviewCard/ViewBookUserReviewCard';
import ViewBookOtherReviewCard from '../../components/ViewBookReviewCard/ViewBookOtherReviewCard';

import { FaTimesCircle } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";
import "./ViewBook.css";

class ViewBook extends Component {
    state = {
        book: this.props.book,
        user: {
            'userID': localStorage.getItem('userID'),
            'userName': localStorage.getItem('userFirstname') + " " + localStorage.getItem('userSurname'),
            'userIcon': localStorage.getItem('userProfilePhotoURL')
        },
        reviews: null,
        reviewOfUser: null,
        numberOfReviewsDisplayed: null,
        reviewsDisplayed: null,
        showMoreReviewsButtonVisible: 'none'
    };

    handleGetReviews = async () => {
        //Getting the Reviews from the database
        const bookID = this.state.book.bookID;
        const reviewsResult = await axios.post("http://localhost:3000/getReviews", {
            bookID: bookID
        });
        if (reviewsResult.data.response) {
            //Checking whether there is a review of the logged in user or not
            let reviews = reviewsResult.data.reviews;
            let userID = this.state.user.userID;
            let newReviews = null;
            reviews.forEach((review, index) => {
                if (review.reviewerID == userID && this.state.reviewOfUser === null){
                    this.setState({reviewOfUser: review});
                    newReviews = reviews
                    newReviews.splice(index, 1);
                    reviews = newReviews;
                    this.setState({reviews : reviews});
                }
            });
            //Checking whether we need to display "Show More Reviews"-Button or not
            if(this.state.numberOfReviewsDisplayed === null) {
                let numberOfReviews = null;
                if(reviews.length > 3) {
                    numberOfReviews = 3;
                    this.setState({ numberOfReviewsDisplayed: numberOfReviews,
                        showMoreReviewsButtonVisible: 'flex'});
                    this.setState({ reviewsDisplayed: reviews.slice(0, numberOfReviews)});
                } else {
                    this.setState({ numberOfReviewsDisplayed: reviews.length, reviewsDisplayed: reviews});
                }
            }    
        }
    }

    handleShowMoreReviews = () => {
        if(this.state.reviews.length <= this.state.numberOfReviewsDisplayed + 3) {
            this.setState({ numberOfReviewsDisplayed: this.state.reviews.length,
                            reviewsDisplayed: this.state.reviews,
                            showMoreReviewsButtonVisible: 'none'
                        });
        } else {
            let numberOfReviews = this.state.numberOfReviewsDisplayed + 3;
            this.setState({ numberOfReviewsDisplayed: numberOfReviews,
                reviewsDisplayed: this.state.reviews.slice(0, numberOfReviews)
                });
        }
    }

    handleMyReviewClicked = () => {
        this.props.history.push({   pathname: '/viewReview',
                                    state: { reviewID: this.state.reviewOfUser.reviewID }});
    }

    handleOtherReviewClicked = (review) => {
        this.props.history.push({   pathname: '/viewReviewOfOther',
                                    state: { review: review, book: this.state.book, user: this.state.user }});
    }

    handleAddReview = () => {
        this.props.history.push({   pathname: '/addReview',
                                    state: { book: this.state.book, user: this.state.user }});
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }

        if(this.state.reviews === null){
            this.handleGetReviews();
        }

        const {t} = this.props;   
        
        let reviewOfUser = null;
        let horizontalBreakline = null;

        if(this.state.reviewOfUser !== null) {
            reviewOfUser = (
                <div className='viewBookUserReviewSection'>
                    <p className='viewBookUserReviewHeader'>{t('view_book.your_review')}</p>
                    <ViewBookUserReviewCard click={this.handleMyReviewClicked}
                                            reviewerIcon={this.state.reviewOfUser.reviewerIcon}
                                            reviewerName={this.state.reviewOfUser.reviewerName}
                                            reviewDate={this.state.reviewOfUser.reviewDate}
                                            reviewText={this.state.reviewOfUser.reviewText}
                                            reviewComments={this.state.reviewOfUser.reviewComments}
                                            reviewRating={this.state.reviewOfUser.reviewRating}/>
                </div>
            )
            horizontalBreakline = (
                <div className='viewBookUserReviewBreaklineContainer' >
                    <hr className='viewBookUserReviewBreakline' />
                </div>
            )
        } else {
            reviewOfUser = (
                <div className='viewBookAddReviewContainer' onClick={this.handleAddReview}>
                    <p className='viewBookUserReviewHeader'>{t('view_book.add_your')}</p>
                    <FaPlusCircle className="viewBookAddReviewIcon"
                                size={124}/>
                </div>
            )
        }

        let reviewsOfOther = null;
        if(this.state.reviewsDisplayed === null || (typeof(this.state.reviewsDisplayed) === 'object' && this.state.reviewsDisplayed.length === 0)) {
            reviewsOfOther = (
                <div className='viewBookUserReviewSection'>
                    <div className='searchResultsNoResultsSection'>
                        <FaTimesCircle size={148} color='#341f97'/>
                        There are no Reviews yet for this book!
                    </div>
                </div>
            );
        }else{
            reviewsOfOther = (
                <div className='viewBookOtherReviewsContainer'>
                    {this.state.reviewsDisplayed.map((review, index) => {
                        if(review.reviewerID !== this.state.user.userID){
                            return (
                                <ViewBookOtherReviewCard    click={this.handleOtherReviewClicked.bind(this,review)}
                                                            key={index}
                                                            reviewerID={review.reviewerID}
                                                            reviewerIcon={review.reviewerIcon}
                                                            reviewerName={review.reviewerName}
                                                            reviewDate={review.reviewDate}
                                                            reviewText={review.reviewText}
                                                            reviewComments={review.reviewComments}
                                                            reviewRating={review.reviewRating}/>
                            );
                        }
                        return null;
                    })}
                </div>
            );
        }

        return(
            <div className='viewBookBackgroundSection'>
                <div className='viewBookBackgroundFilterSection'>
                    <div className='viewBookMainContainer'>
                        <p className='viewBookHeader'>{this.state.book.bookName}</p>
                        <div className='viewBookBreaklineContainer' >
                            <hr className='viewBookBreakline' />
                        </div>
                        <div className='viewBookContainer'>
                            <div className='viewBookBookCardContainer'>
                                <div className='viewBookBookCardThumbnailWrapper'>
                                    <img src={this.state.book.bookThumbnail} className='viewBookBookCardThumbnail' alt='bookThumbnail'/>
                                </div>
                                <div className='viewBookBookCardName'>
                                    <p>{this.state.book.bookName}</p>
                                </div>
                                <table className='viewBookBookCardInformationTable'>
                                    <tbody>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('view_book.author')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookAuthor}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('view_book.publisher')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookPublisher}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('view_book.year_of_pub')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookPublishingYear}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('view_book.category')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookCategory}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('view_book.subject')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookSubject}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('view_book.language')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookLanguage}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='viewBookReviewsContainer'>
                                {reviewOfUser}
                                {horizontalBreakline}
                                <div className='viewBookOtherReviewsContainer'>
                                    {reviewsOfOther}
                                    <button className='viewBookShowReviewsButton' style={{ display: this.state.showMoreReviewsButtonVisible}} onClick={this.handleShowMoreReviews}>
                                        {t('view_book.show_more')} 
                                        <img src={ExpandIcon} className='viewBookShowReviewsButtonIcon' alt='ShowReviewsIcon'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(ViewBook));