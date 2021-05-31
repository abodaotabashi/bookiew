import React, { Component } from 'react';
import "./EditReview.css";

import UserIcon from "../../assets/icons/user.png";
import { FaCheck } from 'react-icons/fa'
import { FaWindowClose } from 'react-icons/fa'

import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';

class EditReview extends Component {
    state = {
        book: this.props.book,
        review: this.props.review,
        reviewText: this.props.reviewText
    }

    handleCancelEditing = () => {
        this.props.history.goBack();
    }

    handleEditReview = () => {
        //TODO
    }

    render(){
        const {t} = this.props;
        return(
            <div className='editReviewBackgroundSection'>
                <div className='editReviewBackgroundFilterSection'>
                    <div className='editReviewContainer'>
                        <p className='editReviewHeader'>{t('edit_review.title')}</p>
                        <div className='editReviewBreaklineContainer' >
                            <hr className='editReviewBreakline' />
                        </div>
                        <div className='editReviewReviewSection'>
                            <div className='editReviewReviewContainer'>
                                <div className='reviewCardContainer'>
                                    <div className='reviewCardBookThumbnailWrapper'>
                                        <img src={this.state.book.bookThumbnail} className='reviewCardBookThumbnail' alt='bookThumbnail'/>
                                    </div>
                                    <div className='reviewCardWrapper'>
                                        <div className='reviewCardBookName'>
                                            <p>{this.state.book.bookName}</p>
                                        </div>
                                        <div className='reviewCardBookAuthor'>
                                            <p>{this.state.book.bookAuthor}</p>
                                        </div>
                                        <div className='reviewCardBreaklineContainer' >
                                            <hr className='reviewCardBreakline' />
                                        </div>
                                        <div className='reviewCardReviewerContainer'>
                                            <div className='reviewCardReviewerWrapper'>
                                                <div className='reviewCardReviewerIconWrapper'>
                                                    <img src={(this.state.review.reviewerIcon === '' || typeof(this.state.review.reviewerIcon) === 'undefined') ? UserIcon : this.state.review.reviewerIcon} className='reviewCardReviewerIcon' alt='reviewer'/>
                                                </div>
                                                <div className='reviewCardReviewerName'>{this.state.review.reviewerName}</div>
                                            </div>
                                            <div className='reviewCardReviewDate'>
                                                <p>{t('edit_review.pub_on')}{this.state.review.reviewDate}</p>
                                            </div>
                                        </div>
                                        <textarea   className='editReviewInputText' 
                                                    value={this.state.reviewText}
                                                    onChange={(event) => {this.setState({reviewText: event.target.value})}}/>
                                    </div>
                                </div>
                            </div>
                            <div className='editReviewEditingContainer'>
                                <div className='editReviewSubmitReviewWrapper' onClick={this.handleEditReview}>
                                    <FaCheck  
                                        color="#ffffff" 
                                        size={100}/>
                                    <p className='editReviewEditingLabel'>{t('edit_review.submit')}</p>
                                </div>
                                <div className='editReviewCancelReviewWrapper' onClick={this.handleCancelEditing}>
                                    <FaWindowClose  
                                        color="#ffffff" 
                                        size={100}/>
                                    <p className='editReviewEditingLabel'>{t('edit_review.cancel')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(EditReview));