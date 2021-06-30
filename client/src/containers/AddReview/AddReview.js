import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import axios from 'axios';

import AcknowledgementDialog from '../../components/Dialogs/AcknowledgementDialog';

import ThumbnailTest from "../../assets/images/thumbnailtest.png";
import UserIcon from "../../assets/icons/user.png";
import "../ViewReview/ViewReview.css";
import "./AddReview.css";

class AddReview extends Component {
    state = {
        book: this.props.book,
        review: '',
        user: this.props.user,
        errorMessage: '',
        errorVisible: 'none',
        openAckDialog: false
    }

    handleAddReview = async () => {
        this.clearErrors();
        if (this.state.review === null || (typeof(this.state.review) === 'string' && this.state.review.trim() === '')) {
            console.log(typeof(this.state.review))
            this.setState({ 
                errorMessage: 'Your Review is empty!',
                errorVisible: 'flex'   
            });
        } else {
            let todayDate = new Date();
            let reviewDate = todayDate.getFullYear() + '/'+ (todayDate.getMonth()+1) + '/' + todayDate.getDate();
            const addResult = await axios.post("http://localhost:3000/addReview", {
                userID: this.state.user.userID,
                bookID: this.state.book.bookID,
                review: this.state.review,
                reviewDate: reviewDate
            });
            if (addResult.data.response) {
                this.setState({openAckDialog: true});
            }
        }
    }

    clearErrors = () => {
        this.setState({
            errorMessage: '',
            errorVisible: 'none'
        });
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
                                    <img src={(this.state.book.bookThumbnail === '') ? ThumbnailTest : this.state.book.bookThumbnail} className='viewBookBookCardThumbnail' alt='bookThumbnail'/>
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
                                            <img src={(this.state.user.userIcon === '' || typeof(this.state.user.userIcon) === 'undefined') ? UserIcon : this.state.user.userIcon} className='viewBookUserReviewerIcon' alt='reviewer'/>
                                        </div>
                                        <div className='viewBookUserReviewerName'>{this.state.user.userName}</div>
                                    </div>
                                </div>
                                <textarea   className='addReviewReviewText' 
                                            name=""
                                            maxLength="500"
                                            required value={this.state.review} 
                                            onChange={(event) => this.setState({review: event.target.value})}  
                                            placeholder={t('placeholders.your_review')} />
                                <div className='addReviewReviewTextLength'>
                                    📝 {this.state.review.length}/500
                                    <span className='addReviewReviewTextLengthTooltip'><p>{t('add_review.warning')}</p></span>
                                </div>
                                <div className='addReviewErrorMessage' style={{ display: this.state.errorVisible}}>{this.state.errorMessage}</div>
                                <div className='viewBookOtherReviewsContainer'>
                                    <button className='viewBookShowReviewsButton' onClick={this.handleAddReview}>
                                        {t('add_review.publish_review')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AcknowledgementDialog  openAckDialog={this.state.openAckDialog}
                                    content= {t('dialogs.add_review')}
                                    ok="Ok"
                                    okFunction={() => { this.setState({openAckDialog: false});
                                                        this.props.history.push({
                                                            pathname: '/viewBook',
                                                            state: { book: this.state.book }
                                                        });}}>
                    </AcknowledgementDialog>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(AddReview));