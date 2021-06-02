import React, { Component } from 'react';
import "../ViewReview/ViewReview.css";
import "./AddReview.css";

import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';


class AddReview extends Component {
    state = {
        book: this.props.book,
        review: '',
        user: this.props.user
    }

    handleAddReview = () => {
        //TODO
    }
    
    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }
        const { t } = this.props;
        return(
            <div className='viewReviewBackgroundSection'>
                <div className='viewReviewBackgroundFilterSection'>
                    <div className='viewReviewContainer'>
                        <p className='viewReviewHeader'>{t('add_review.Add_Review')}</p>
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
                                            <td className='viewBookBookCardInformationRow'>{t('add_review.author')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookAuthor}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('add_review.publisher')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookPublisher}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('add_review.year_of_pub')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookPublishingYear}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('add_review.category')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookCategory}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('add_review.subject')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookSubject}</td>
                                        </tr>
                                        <tr>
                                            <td className='viewBookBookCardInformationRow'>{t('add_review.language')}</td>
                                            <td className='viewBookBookCardInformationRow'>{this.state.book.bookLanguage}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='addReviewReviewContainer'>
                                <div className='addReviewReviewerContainer'>
                                    <div className='addReviewReviewerWrapper'>
                                        <div className='viewBookUserReviewerIconWrapper'>
                                            <img src={this.state.user.userIcon} className='viewBookUserReviewerIcon' alt='reviewer'/>
                                        </div>
                                        <div className='viewBookUserReviewerName'>{this.state.user.userName}</div>
                                    </div>
                                </div>
                                <textarea   className='addReviewReviewText' 
                                            name=""
                                            maxLength="500"
                                            required value={this.state.review} 
                                            onChange={(event) => this.setState({review: event.target.value})}  
                                            placeholder='Your Review' />
                                <div className='addReviewReviewTextLength'>
                                    📝 {this.state.review.length}/500
                                    <span className='addReviewReviewTextLengthTooltip'><p>{t('add_review.warning')}</p></span>
                                </div>
                                <div className='viewBookOtherReviewsContainer'>
                                    <button className='viewBookShowReviewsButton' onClick={this.handleAddReview}>
                                        {t('add_review.publish_review')}
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

export default withTranslation()(withRouter(AddReview));