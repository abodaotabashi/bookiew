import React, { Component } from 'react';
import "./ViewReview.css";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import {withTranslation} from "react-i18next";

import HomeReviewCard from '../../components/HomeReviewCard/HomeReviewCard';
import WarningDialog from '../../components/Dialogs/WarningDialog';

import ThumbnailTest from "../../assets/images/thumbnailtest.png";
import UserIcon from "../../assets/icons/user.png";
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'

class ViewReview extends Component {
    state = {
        reviewID: this.props.reviewID,
        book: null,
        review: null,
        reviewComments: null,
        numberOfCommentDisplayed: null,
        reviewCommentsDisplayed: null,
        showMoreCommentsButtonVisible: 'none',
        openWarningDialog: false
    }

    handleGetReview = async () => {
        if (this.state.review === null) {
            const reviewID = this.state.reviewID ;
            const reviewResult = await axios.post("http://localhost:3000/getReview",{
                reviewID:reviewID
            })
            const displayedReview = reviewResult.data.review;
            const userResult = await axios.post("http://localhost:3000/getUser", {
                userID:displayedReview.reviewerID
            })
            const reviewer = userResult.data.user;
            const bookResult = await axios.post("http://localhost:3000/getBook", {
                bookID: displayedReview.reviewBookID
            })
            const book = bookResult.data.book;
            const commentsResult = await axios.post("http://localhost:3000/getComments", {
                reviewID:reviewID
            })
            const comments = commentsResult.data.comments;
            this.setState({
                book : book,
                reviewComments : comments,
                review :{   bookName:book.bookName ,
                            bookAuthor:book.bookAuthor ,
                            bookThumbnail:book.bookThumbnail,
                            reviewText: displayedReview.text,
                            reviewerIcon: reviewer.profilePhotoURL,
                            reviewerName: reviewer.name,
                            reviewDate:displayedReview.date,
                            reviewRating: displayedReview.rating,
                            reviewComments:comments            
                        } 
            });
            if(typeof(comments) === 'undefined' || comments === null) {
                this.setState({reviewComments: null});
            } else {
                if(this.state.numberOfCommentDisplayed === null) {
                    let numberOfComments = null;
                    if(comments.length > 1) {
                        numberOfComments = 1;
                        this.setState({ numberOfCommentDisplayed: 1,
                            showMoreCommentsButtonVisible: 'flex' });
                    } else {
                        numberOfComments = comments.length;
                        this.setState({ numberOfCommentDisplayed: comments.length, showMoreCommentsButtonVisible: 'none'});
                    }
                    this.setState({ reviewCommentsDisplayed: comments.slice(0, numberOfComments)});
                }
            }
        }
    }

    handleShowMoreComments = () => {
        if(this.state.reviewComments.length <= this.state.numberOfCommentDisplayed + 3) {
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

    handleDeleteReview = async () => {
        let hasComments = true;
        const reviewID = this.state.reviewID ;
        if (this.state.reviewComments === null) {
            hasComments = false;
        }
        const deleteReview = await axios.post("http://localhost:3000/deleteReview", {
            reviewID:reviewID,
            hasComments:hasComments
        })
        if (deleteReview.data.response) {
            this.props.history.push({pathname: '/myReviews'});
        } else {
            console.log(deleteReview.data.message);
        }
    }

    handleEditReview = () => {
        console.log(this.state.reviewID + " " + this.state.review.reviewText)
        this.props.history.push({
            pathname: '/editReview',
            state: {reviewID:this.state.reviewID,  review: this.state.review, book: this.state.book, reviewText: this.state.review.reviewText }});
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }
        
        let review = null;
        const {t} = this.props;
        this.handleGetReview();
        
        const myPhoto = localStorage.getItem("userProfilePhotoURL");

        if (this.state.review !== null && (this.state.review.reviewComments !== null || typeof(this.state.review.reviewComments) !== 'undefined')) {
            review = (<HomeReviewCard reviewerIcon={(myPhoto === '' || typeof(myPhoto) === 'undefined') ? UserIcon : myPhoto}
                reviewerName={this.state.review.reviewerName}
                reviewText={this.state.review.reviewText}
                reviewDate={this.state.review.reviewDate}
                reviewRating={this.state.review.reviewRating}
                bookName={this.state.book.bookName}
                bookAuthor={this.state.book.bookAuthor}
                bookThumbnail={(this.state.book.bookThumbnail === '') ? ThumbnailTest : this.state.book.bookThumbnail}
                reviewComments={this.state.reviewCommentsDisplayed}
                reviewCommentsNumber={(typeof(this.state.reviewComments) === 'undefined' || this.state.reviewComments === null) ? 0 : this.state.reviewComments.length}
                />);
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
                                {review}
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
                                <div className='viewReviewDeleteReviewWrapper' onClick={() => {this.setState({openWarningDialog: true});}}>
                                    <FaTrash  
                                        color="#ffffff" 
                                        size={100}/>
                                    <p className='viewReviewEditingLabel'>{t('view_review.delete')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <WarningDialog  openWarningDialog={this.state.openWarningDialog}
                                    title='Delete this review?'
                                    content='Are you sure that you want to delete this review permanently?'
                                    contentSpan='All Comments on this review will be automatically deleted!'
                                    yes="Delete"
                                    no="Cancel"
                                    yesFunction={this.handleDeleteReview}
                                    noFunction={() => {this.setState({openWarningDialog: false});}}>
                    </WarningDialog>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(ViewReview));