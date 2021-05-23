import React, { Component } from 'react';
import "../ViewReview/ViewReview.css";
import "./AddReview.css";

import { withRouter } from "react-router-dom";

class AddReview extends Component {
    state = {
        book: this.props.book,
        review: '',
        user: this.props.user
    }

    handleAddReview = () => {
        //TODO
    }

    render(){
        return(
            <div className='viewReviewBackgroundSection'>
                <div className='viewReviewBackgroundFilterSection'>
                    <div className='viewReviewContainer'>
                        <p className='viewReviewHeader'>Add Review</p>
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
                                    <span className='addReviewReviewTextLengthTooltip'>The maximum limit of characters is 500!</span>
                                </div>
                                <div className='viewBookOtherReviewsContainer'>
                                    <button className='viewBookShowReviewsButton' onClick={this.handleAddReview}>
                                        Publish Review
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

export default withRouter(AddReview);