import React, { Component } from 'react';
import "./EditReview.css";

import { FaCheck } from 'react-icons/fa'
import { FaWindowClose } from 'react-icons/fa'

import { withRouter } from "react-router-dom";

class EditReview extends Component {
    state = {
        book: this.props.book,
        review: this.props.review,
        reviewText: this.props.review.reviewText
    }

    handleCancelEditing = () => {
        this.props.history.goBack();
    }

    handleEditReview = () => {
        //TODO
    }

    render(){
        return(
            <div className='editReviewBackgroundSection'>
                <div className='editReviewBackgroundFilterSection'>
                    <div className='editReviewContainer'>
                        <p className='editReviewHeader'>Edit Review</p>
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
                                                    <img src={this.state.review.reviewerIcon} className='reviewCardReviewerIcon' alt='reviewer'/>
                                                </div>
                                                <div className='reviewCardReviewerName'>{this.state.review.reviewerName}</div>
                                            </div>
                                            <div className='reviewCardReviewDate'>
                                                <p>Published On {this.state.review.reviewDate}</p>
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
                                    <p className='editReviewEditingLabel'>Submit</p>
                                </div>
                                <div className='editReviewCancelReviewWrapper' onClick={this.handleCancelEditing}>
                                    <FaWindowClose  
                                        color="#ffffff" 
                                        size={100}/>
                                    <p className='editReviewEditingLabel'>Cancel</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditReview);