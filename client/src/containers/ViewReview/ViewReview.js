import React, { Component } from 'react';
import "./ViewReview.css";
import axios from 'axios';

import HomeReviewCard from '../../components/HomeReviewCard/HomeReviewCard';

import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'

import { withRouter } from "react-router-dom";
import {withTranslation} from "react-i18next";

class ViewReview extends Component {
    state = {
        book:null,
        review: null,
        reviewComments: null,
        numberOfCommentDisplayed: null,
        reviewCommentsDisplayed: null,
        showMoreCommentsButtonVisible: 'flex'
    }

    handleGetReview = async (props) => {
        if (this.state.review == null) {
            //const reviewID = props.location.state.reviewID;
            const reviewID = 1 ;
            const reviewResult = await axios.post("http://localhost:3000/getReview",{
                reviewID:reviewID
            })
            const displayedReview = reviewResult.data.review;
            const userResult = await axios.post("http://localhost:3000/getUser", {
                userID:displayedReview.reviewerID
            })
            const bookResult = await axios.post("http://localhost:3000/getBook", {
                bookID: displayedReview.reviewBookID
            })
            const book = bookResult.data.book;
            this.state.book = book;
            const commentsResult = await axios.post("http://localhost:3000/getComments", {
                reviewID:reviewID
            })
            const comments = commentsResult.data.comments;
            this.state.reviewComments = comments;
            const reviewer = userResult.data.user;
            this.state.review = {  bookName:book.bookName ,
                            bookAuthor:book.bookAuthor ,
                            bookThumbnail:book.bookThumbnail,
                            reviewText: displayedReview.text,
                            reviewerIcon: reviewer.icon,
                            reviewerName: reviewer.name,
                            reviewDate:displayedReview.date,
                            reviewRating: displayedReview.rating,
                            reviewComments:comments              
                        } 
        }
    }

    handleShowMoreComments = () => {
        if(this.state.reviewComments.length < this.state.numberOfCommentDisplayed + 3) {
            this.setState({ numberOfCommentDisplayed: this.state.reviewComments.length,
                            reviewCommentsDisplayed: this.state.reviewComments,
                            showMoreCommentsButtonVisible: 'none'
                        });
        } else {
            let numberOfReviews = this.state.numberOfCommentDisplayed + 3;
            this.setState({ numberOfCommentDisplayed: numberOfReviews,
                reviewCommentsDisplayed: this.state.reviewComments.slice(0, numberOfReviews)
                });
        }
    }

    handleDeleteReview = () => {
        //TODO
    }

    handleEditReview = () => {
        this.props.history.push({
            pathname: '/editReview',
            state: { review: this.props.review, book: this.state.book }});
    }

    render(){
        const {t} = this.props;
        this.handleGetReview();
        let review = null;
        if (this.state.review !== null) {
            if(this.state.numberOfCommentDisplayed === null) {
                let numberOfReviews = null;
                if(this.props.review.reviewComments.length > 1) {
                    numberOfReviews = 1;
                    this.setState({ numberOfCommentDisplayed: 1 });
                } else {
                    numberOfReviews = this.props.review.reviewComments.length;
                    this.setState({ numberOfCommentDisplayed: this.props.review.reviewComments.length, showMoreCommentsButtonVisible: 'none'});
                }
                this.setState({ reviewCommentsDisplayed: this.props.review.reviewComments.slice(0, numberOfReviews)});
            }
        }
        return(
            <div className='viewReviewBackgroundSection'>
                <div className='viewReviewBackgroundFilterSection'>
                    <div className='viewReviewContainer'>
                        <p className='viewReviewHeader'>{t('view_review.title')}</p>
                        <div className='viewReviewBreaklineContainer' >
                            <hr className='viewReviewBreakline' />
                        </div>
                        <div className='viewReviewReviewSection'>
                            <div className='viewReviewReviewContainer'>
                                <HomeReviewCard reviewerIcon={this.state.review.reviewerIcon}
                                        reviewerName={this.state.review.reviewerName}
                                        reviewText={this.state.review.reviewText}
                                        reviewDate={this.state.review.reviewDate}
                                        reviewRating={this.state.review.reviewRating}
                                        bookName={this.state.book.bookName}
                                        bookAuthor={this.state.book.bookAuthor}
                                        bookThumbnail={this.state.book.bookThumbnail}
                                        reviewComments={this.state.reviewCommentsDisplayed}
                                        reviewCommentsNumber={this.state.reviewComments.length}
                                        />
                                <button className='viewReviewShowCommentsButton' style={{ display: this.state.showMoreCommentsButtonVisible}} onClick={this.handleShowMoreComments}>
                                    {t('view_review.show_more')}
                                    <img src={ExpandIcon} className='viewReviewShowCommentsButtonIcon' alt='ShowCommentsIcon'/>
                                </button>
                            </div>
                            <div className='viewReviewEditingContainer'>
                                <div className='viewReviewEditReviewWrapper' onClick={this.handleEditReview}>
                                    <FaEdit  
                                        color="#ffffff" 
                                        size={100}/>
                                    <p className='viewReviewEditingLabel'>{t('view_review.edit')}</p>
                                </div>
                                <div className='viewReviewDeleteReviewWrapper' onClick={this.handleDeleteReview}>
                                    <FaTrash  
                                        color="#ffffff" 
                                        size={100}/>
                                    <p className='viewReviewEditingLabel'>{t('view_review.delete')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(ViewReview));