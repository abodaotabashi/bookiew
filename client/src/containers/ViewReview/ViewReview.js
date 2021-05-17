import React, { Component } from 'react';
import "./ViewReview.css";

import HomeReviewCard from '../../components/HomeReviewCard/HomeReviewCard';

import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'

import { withRouter } from "react-router-dom";

class ViewReview extends Component {
    state = {
        review: this.props.review,
        reviewComments: this.props.review.reviewComments,
        numberOfCommentDisplayed: null,
        reviewCommentsDisplayed: null,
        showMoreCommentsButtonVisible: 'flex'
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
            state: { review: this.props.review }});
    }

    render(){
        if(this.state.numberOfCommentDisplayed === null) {
            let numberOfReviews = null;
            if(this.props.review.reviewComments.length >= 1) {
                numberOfReviews = 1;
                this.setState({ numberOfCommentDisplayed: 1 });
            } else {
                this.setState({ numberOfCommentDisplayed: this.props.review.reviewComments.length});
            }
            this.setState({ reviewCommentsDisplayed: this.props.review.reviewComments.slice(0, numberOfReviews)});
        }
        return(
            <div className='viewReviewBackgroundSection'>
                <div className='viewReviewBackgroundFilterSection'>
                    <div className='viewReviewContainer'>
                        <p className='viewReviewHeader'>View Review</p>
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
                                        bookName={this.state.review.bookName}
                                        bookAuthor={this.state.review.bookAuthor}
                                        bookThumbnail={this.state.review.bookThumbnail}
                                        reviewComments={this.state.reviewCommentsDisplayed}
                                        />
                                <button className='viewReviewShowCommentsButton' style={{ display: this.state.showMoreCommentsButtonVisible}} onClick={this.handleShowMoreComments}>
                                    Show More Comments 
                                    <img src={ExpandIcon} className='viewReviewShowCommentsButtonIcon' alt='ShowCommentsIcon'/>
                                </button>
                            </div>
                            <div className='viewReviewEditingContainer'>
                                <div className='viewReviewEditReviewWrapper' onClick={this.handleEditReview}>
                                    <FaEdit  
                                        color="#ffffff" 
                                        size={100}/>
                                    <p className='viewReviewEditingLabel'>Edit Review</p>
                                </div>
                                <div className='viewReviewDeleteReviewWrapper' onClick={this.handleDeleteReview}>
                                    <FaTrash  
                                        color="#ffffff" 
                                        size={100}/>
                                    <p className='viewReviewEditingLabel'>Delete Review</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewReview);