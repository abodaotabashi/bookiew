import React, { Component } from 'react';
import "./ViewReview.css";

import Comment from '../../components/Comment/Comment';
import StarRating from '../StarRating/StarRating';
import { FaStar } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";

import { withRouter } from "react-router-dom";
import axios from 'axios';

class ViewOtherReview extends Component {
    state = {
        book: this.props.book,
        review: this.props.review,
        reviewComments: this.props.review.reviewComments,
        numberOfCommentDisplayed: null,
        reviewCommentsDisplayed: null,
        showMoreCommentsButtonVisible: 'flex',
        user: this.props.user,
        userComment: null,//{ commenterName: 'Abdurrahman', commentText: 'That is amazing!', commentDate: '30.03.2021'},
        newComment: '',
        userRating: null,
        newRating: null
    }

    handleReviewRated = (ratingValue) => {
        this.setState({newRating: ratingValue});
        //TODO
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

    handleNewComment = async () => {
        //TODO
        var showDate = new Date();
        const userID = localStorage.getItem('userID');
        const commentText = this.state.newComment;
        const commentDate = showDate.getFullYear() + '/'+ showDate.getMonth() + '/' + showDate.getDate();
        const newRating = this.state.newRating;
        const reviewID = this.state.review.reviewID;
        const result = await axios.post("http://localhost:3000/addComment", {
            userID:userID,
            commentText: commentText,
            commentDate: commentDate,
            reviewID:reviewID,
            newRating:newRating
        });
        if (result.data.response) {
            console.log('success');
            this.props.history.push({
                pathname:'/home'
            })
        }
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }

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

        let CommentOfUser = null;

        if(this.state.userComment === null) {
            CommentOfUser = (
                <div className='viewBookAddCommentSection'>
                    <input  className='viewReviewCommentInputText' 
                            type='text' 
                            name=''
                            value={this.state.newComment} 
                            onChange={(event) => this.setState({newComment: event.target.value})}  
                            placeholder='Add Your Comment ...' />
                    <div className="viewReviewCommentInputSendButton" onClick={this.handleNewComment}>
                        <FaComment className='viewReviewCommentInputSendButtonIcon' size={22}/>
                    </div>
                </div>
            );
        } else {
            CommentOfUser = ( 
                <div className='viewReviewCommentWrapper'>
                    <Comment    commenterIcon={this.state.user.userIcon}
                                commenterName={this.state.user.userName}
                                commentDate={this.state.userComment.commentDate}
                                commentText={this.state.userComment.commentText}
                                />
                </div>
                
            )
        }

        let Comments = null;
        if(this.state.reviewCommentsDisplayed !== null) {
            Comments = (
                <div className='viewReviewCommentsContainer'>
                    {this.state.reviewCommentsDisplayed.map((comment, index) => {
                        return (
                            <Comment    key={index}
                                        commenterIcon={comment.commenterIcon}
                                        commenterName={comment.commenterName}
                                        commentDate={comment.commentDate}
                                        commentText={comment.commentText}
                                        />
                        );
                    })}
                </div>
            )    
        }

        let RatingLabel = '';
        if(this.state.userRating !== null) {
            RatingLabel = 'Your Rating: ';
        } else {
            RatingLabel = 'Rate it now!';
        }

        return(
            <div className='viewReviewBackgroundSection'>
                <div className='viewReviewBackgroundFilterSection'>
                    <div className='viewReviewContainer'>
                        <p className='viewReviewHeader'>View Review</p>
                        <div className='viewReviewBreaklineContainer' >
                            <hr className='viewReviewBreakline' />
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
                                            <td className='viewBookBookCardInformationRow'>Author:</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookAuthor}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>Publisher:</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookPublisher}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>Year of Publication:</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookPublishingYear}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>Category:</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookCategory}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>Subject:</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookSubject}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>Language:</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookLanguage}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='viewBookReviewsContainer'>
                                <div className='viewBookOtherReviewWrapper'>
                                    <div className='viewBookUserReviewerContainer'>
                                        <div className='viewBookUserReviewerWrapper'>
                                            <div className='viewBookUserReviewerIconWrapper'>
                                                <img src={this.state.review.reviewerIcon} className='viewBookUserReviewerIcon' alt='reviewer'/>
                                            </div>
                                            <div className='viewBookUserReviewerName'>{this.state.review.reviewerName}</div>
                                        </div>
                                        <div className='viewBookUserReviewDate'>
                                            <p>Published On {this.state.review.reviewDate}</p>
                                        </div>
                                    </div>
                                    <div className='viewBookUserReviewText'>
                                        {this.state.review.reviewText}
                                    </div>
                                    <div className='viewBookOtherReviewRatingCommentSection'>
                                        <div className='viewBookUserReviewShowCommentsWrapper'>
                                            <p className='viewBookUserReviewLabel'>Comments &nbsp;{this.state.review.reviewComments.length}</p>
                                        </div>
                                        <div className='viewBookRatingSection'>
                                            <p  className='viewReviewRatingLabel'>{RatingLabel}</p>
                                            <StarRating userRating={this.state.userRating} click={this.handleReviewRated} /> 
                                        </div>
                                        <div className='viewBookUserReviewRatingWrapper'>
                                            <p className='viewBookUserReviewLabel'>{this.state.review.reviewRating}</p>
                                            <FaStar className="viewBookUserReviewStar"
                                                    color="#ffc107" 
                                                    size={24}/>
                                        </div>
                                    </div>
                                    {CommentOfUser}
                                    <div className='viewBookUserReviewBreaklineContainer' >
                                        <hr className='viewBookUserReviewBreakline' />
                                    </div>
                                    {Comments}
                                </div>
                                <div className='viewBookOtherReviewsContainer'>
                                    <button className='viewBookShowReviewsButton' style={{ display: this.state.showMoreCommentsButtonVisible}} onClick={this.handleShowMoreComments}>
                                        Show More Comments 
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

export default withRouter(ViewOtherReview);