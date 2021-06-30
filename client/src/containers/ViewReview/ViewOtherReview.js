import React, { Component } from 'react';
import {withTranslation} from "react-i18next"
import { withRouter } from "react-router-dom";
import axios from 'axios';

import Comment from '../../components/Comment/Comment';
import StarRating from '../StarRating/StarRating';
import AcknowledgementDialog from '../../components/Dialogs/AcknowledgementDialog';

import ThumbnailTest from "../../assets/images/thumbnailtest.png";
import { FaStar } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";
import UserIcon from "../../assets/icons/user.png";
import "./ViewReview.css";

class ViewOtherReview extends Component {
    state = {
        book: this.props.book,
        review: this.props.review,
        reviewComments: null,
        numberOfCommentDisplayed: null,
        reviewCommentsDisplayed: null,
        showMoreCommentsButtonVisible: 'none',
        user: this.props.user,
        newComment: '',
        userRating: 0,
        newRating: null,
        commentErrorMessage: '',
        openAckDialog: false
    }

    handleGetRatingOfUser = async () => {
        const userID = localStorage.getItem('userID');
        const result  = await axios.post("http://localhost:3000/getRatingOfUser", {
            userID: userID,
            reviewID: this.state.review.reviewID
        });
        if (result.data.response) { 
            this.setState({userRating: result.data.rating})
            console.log(this.state.userRating);
        } else {
            console.log('no rating for you');
        }
    }

    handleUpdateRating = async (ratingValue) => {
        this.setState({newRating: ratingValue});
        const result = await axios.post("http://localhost:3000/updateRating", {
            userID: localStorage.getItem('userID'),
            reviewID: this.state.review.reviewID, 
            newRating: ratingValue
        });
        if (result.data.response) {
            let updatedReview = {
                reviewID: this.state.review.reviewID,
                reviewDate: this.state.review.reviewDate,
                reviewRating: result.data.newScore,
                reviewText: this.state.review.reviewText,
                reviewerID: this.state.review.reviewerID,
                reviewerIcon: this.state.review.reviewerIcon,
                reviewerName: this.state.review.reviewerName,
                reviewComments: this.state.review.reviewComments
            };
            this.setState({review: updatedReview});
            console.log('rating updated!');
        } else {
            console.log('something went wrong');
        }
    }

    handleGetComments = async () => {
        const commentsResult = await axios.post("http://localhost:3000/getComments", {
            reviewID: this.props.review.reviewID
        })
        if(commentsResult.data.response){
            const comments = commentsResult.data.comments;
            this.setState({reviewComments : comments});
            if(this.state.numberOfCommentDisplayed === null) {
                let numberOfComments = null;
                if(comments.length > 3) {
                    numberOfComments = 3;
                    this.setState({ numberOfCommentDisplayed: numberOfComments, showMoreCommentsButtonVisible: 'flex' });
                    this.setState({ reviewCommentsDisplayed: comments.slice(0, numberOfComments)});
                } else {
                    this.setState({ numberOfCommentDisplayed: comments.length, showMoreCommentsButtonVisible: 'none', reviewCommentsDisplayed: comments });
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
            let numberOfComments = this.state.numberOfCommentDisplayed + 3;
            this.setState({ numberOfCommentDisplayed: numberOfComments,
                reviewCommentsDisplayed: this.state.reviewComments.slice(0, numberOfComments)
                });
        }
    }

    handleNewComment = async () => {
        const commentText = this.state.newComment.trim();
        if(commentText !== '') {
            let todayDate = new Date();
            const userID = localStorage.getItem('userID');
            const commentDate = todayDate.getFullYear() + '/' + (todayDate.getMonth()+1) + '/' + todayDate.getDate();
            const reviewID = this.state.review.reviewID;
            const result = await axios.post("http://localhost:3000/addComment", {
                userID: userID,
                commentText: commentText,
                commentDate: commentDate,
                reviewID: reviewID
            });
            if (result.data.response) {
                this.setState({
                    reviewComments: null,
                    numberOfCommentDisplayed: null,
                    reviewCommentsDisplayed: null,
                    showMoreCommentsButtonVisible: 'none',
                    newComment: '',
                    commentErrorMessage: '', 
                    openAckDialog: true});
            }
        } else {
            this.setState({commentErrorMessage: 'Please fill the comment field first!'})
        }
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }
        const {t} = this.props;
        if (this.state.userRating === 0) {
            this.handleGetRatingOfUser(); 
        }
        if(this.state.reviewComments === null) {
            this.handleGetComments();
        }

        let Comments = null;
        if(this.state.reviewCommentsDisplayed !== null) {
            Comments = (
                <div className='viewReviewCommentsContainer'>
                    {this.state.reviewCommentsDisplayed.map((comment) => {
                        return (
                            <Comment    key={comment.commentID}
                                        commenterIcon={(comment.commenterIcon === '' || typeof(comment.commenterIcon) === 'undefined') ? UserIcon : comment.commenterIcon}
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
        if(this.state.userRating !== 0) {
            RatingLabel = 'Your Rating: ';
        } else {
            RatingLabel = 'Rate it now!';
        }

        return(
            <div className='viewReviewBackgroundSection'>
                <div className='viewReviewBackgroundFilterSection'>
                    <div className='viewReviewContainer'>
                        <p className='viewReviewHeader'>{t('view_review.title')}</p>
                        <div className='viewReviewBreaklineContainer' >
                            <hr className='viewReviewBreakline' />
                        </div>
                        <div className='viewBookContainer'>
                            <div className='viewBookBookCardContainer'>
                                <div className='viewBookBookCardThumbnailWrapper'>
                                    <img src={(this.state.book.bookThumbnail === '') ? ThumbnailTest : this.state.book.bookThumbnail} className='viewBookBookCardThumbnail' alt='bookThumbnail'/>
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
                                <div className='viewBookOtherReviewWrapper'>
                                    <div className='viewBookUserReviewerContainer'>
                                        <div className='viewBookUserReviewerWrapper'>
                                            <div className='viewBookUserReviewerIconWrapper'>
                                                <img src={(this.state.review.reviewerIcon === '' || typeof(this.state.review.reviewerIcon) === 'undefined') ? UserIcon : this.state.review.reviewerIcon} className='viewBookUserReviewerIcon' alt='reviewer'/>
                                            </div>
                                            <div className='viewBookUserReviewerName'>{this.state.review.reviewerName}</div>
                                        </div>
                                        <div className='viewBookUserReviewDate'>
                                            <p>{t('home_review_card.pub_on')} {this.state.review.reviewDate}</p>
                                        </div>
                                    </div>
                                    <div className='viewBookUserReviewText'>
                                        {this.state.review.reviewText}
                                    </div>
                                    <div className='viewBookOtherReviewRatingCommentSection'>
                                        <div className='viewBookUserReviewShowCommentsWrapper'>
                                            <p className='viewBookUserReviewLabel'>{t('home_review_card.comments')} &nbsp;{(this.state.reviewComments === null) ? 0 : this.state.reviewComments.length}</p>
                                        </div>
                                        <div className='viewBookRatingSection'>
                                            <p  className='viewReviewRatingLabel'>{RatingLabel}</p>
                                            <StarRating reviewID={this.state.review.reviewID} click={this.handleUpdateRating} />
                                        </div>
                                        <div className='viewBookUserReviewRatingWrapper'>
                                            <p className='viewBookUserReviewLabel'>{this.state.review.reviewRating}</p>
                                            <FaStar className="viewBookUserReviewStar"
                                                    color="#ffc107" 
                                                    size={24}/>
                                        </div>
                                    </div>
                                    <div className='viewBookAddCommentSection'>
                                        <input  className='viewReviewCommentInputText' 
                                                type='text' 
                                                name=''
                                                value={this.state.newComment} 
                                                onChange={(event) => this.setState({newComment: event.target.value})}  
                                                placeholder={t('placeholders.add_your_comment')} />
                                        <div className="viewReviewCommentInputSendButton" onClick={this.handleNewComment}>
                                            <FaComment className='viewReviewCommentInputSendButtonIcon' size={22}/>
                                        </div>
                                    </div>
                                    <p className='ResetPasswordErrorMessage'>{this.state.commentErrorMessage}</p>
                                    <div className='viewBookUserReviewBreaklineContainer' >
                                        <hr className='viewBookUserReviewBreakline' />
                                    </div>
                                    {Comments}
                                </div>
                                <div className='viewBookOtherReviewsContainer'>
                                    <button className='viewBookShowReviewsButton' style={{ display: this.state.showMoreCommentsButtonVisible}} onClick={this.handleShowMoreComments}>
                                        {t('home.Show_More_Comments')} 
                                        <img src={ExpandIcon} className='viewBookShowReviewsButtonIcon' alt='ShowReviewsIcon'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AcknowledgementDialog  openAckDialog={this.state.openAckDialog}
                                    content= {t('dialogs.view_other')}
                                    ok="Ok"
                                    okFunction={() => { this.setState({openAckDialog: false});}}>
                    </AcknowledgementDialog>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(ViewOtherReview));