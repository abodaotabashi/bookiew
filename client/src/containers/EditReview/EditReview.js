import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import axios from 'axios';

import AcknowledgementDialog from '../../components/Dialogs/AcknowledgementDialog';

import ThumbnailTest from "../../assets/images/thumbnailtest.png";
import UserIcon from "../../assets/icons/user.png";
import { FaCheck } from 'react-icons/fa'
import { FaWindowClose } from 'react-icons/fa'
import "./EditReview.css";

class EditReview extends Component {
    state = {
        reviewID:this.props.reviewID,
        book: this.props.book,
        review: this.props.review,
        reviewText: this.props.reviewText,
        openAckDialog: false
    }

    handleCancelEditing = () => {
        this.props.history.goBack();
    }

    handleEditReview = async () => {
        const result = await axios.post("http://localhost:3000/editReview", {
            reviewID : this.state.reviewID,
            reviewText: this.state.reviewText
        })
        if (result.data.response) {
            this.setState({openAckDialog: true});
        }
        console.log(result.data.message);
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }

        const {t} = this.props;
        const myPhoto = localStorage.getItem("userProfilePhotoURL");
        
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
                                        <img src={(this.state.book.bookThumbnail === '') ? ThumbnailTest : this.state.book.bookThumbnail} className='reviewCardBookThumbnail' alt='bookThumbnail'/>
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
                                                    <img src={(myPhoto === '' || typeof(myPhoto) === 'undefined') ? UserIcon : myPhoto} className='reviewCardReviewerIcon' alt='reviewer'/>
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
                    <AcknowledgementDialog  openAckDialog={this.state.openAckDialog}
                                    content='This Review was successfully updated!'
                                    ok="Ok"
                                    okFunction={() => { this.setState({openAckDialog: false});
                                                        this.props.history.push({   pathname: '/viewReview',
                                                                                    state:{reviewID: this.state.reviewID} });}}>
                    </AcknowledgementDialog>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(EditReview));