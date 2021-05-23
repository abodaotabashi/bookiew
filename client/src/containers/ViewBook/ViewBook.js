import React, { Component } from 'react';
import "./ViewBook.css";

import { FaPlusCircle } from 'react-icons/fa';
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";

import ViewBookUserReviewCard from '../../components/ViewBookReviewCard/ViewBookUserReviewCard';
import ViewBookOtherReviewCard from '../../components/ViewBookReviewCard/ViewBookOtherReviewCard';
import { withRouter } from "react-router-dom";

class ViewBook extends Component {
    state = {
        book: this.props.book,
        user: this.props.user,
        reviews: this.props.book.reviews,
        reviewOfUser: null,
        numberOfReviewsDisplayed: null,
        reviewsDisplayed: null,
        showMoreReviewsButtonVisible: 'flex'
    }

    handleShowMoreReviews = () => {
        if(this.state.reviews.length <= this.state.numberOfReviewsDisplayed + 3) {
            this.setState({ numberOfReviewsDisplayed: this.state.reviews.length,
                            reviewsDisplayed: this.state.reviews,
                            showMoreReviewsButtonVisible: 'none'
                        });
        } else {
            let numberOfReviews = this.state.numberOfReviewsDisplayed + 3;
            this.setState({ numberOfReviewsDisplayed: numberOfReviews,
                reviewsDisplayed: this.state.reviews.slice(0, numberOfReviews)
                });
        }
    }


    handleMyReviewClicked = () => {
        this.props.history.push({   pathname: '/viewReview',
                                    state: { review: this.state.reviewOfUser, book:this.state.book}});
    }

    handleOtherReviewClicked = (review) => {
        this.props.history.push({   pathname: '/viewReviewOfOther',
                                    state: { review: review, book:this.state.book, user: this.state.user }});
    }

    handleAddReview = () => {
        this.props.history.push({   pathname: '/addReview',
                                    state: { book:this.state.book, user:this.state.user }});
    }

    checkReviewOfUser = () => {
        let userID = this.state.user.userID;
        this.state.book.reviews.forEach((review, index) => {
            if (review['reviewerID'] === userID && this.state.reviewOfUser === null){
                this.setState({reviewOfUser: review});
                let newReviews = this.state.book.reviews
                newReviews.splice(index, 1);
                this.setState({reviews: newReviews});
            }
        });
    }

    render(){
        this.checkReviewOfUser();

        let reviewOfUser = null;
        let horizontalBreakline = null;
        if(this.state.reviewOfUser !== null) {
            reviewOfUser = (
                <div>
                    <p className='viewBookUserReviewHeader'>Your Review</p>
                    <ViewBookUserReviewCard click={this.handleMyReviewClicked}
                                            reviewerIcon={this.state.reviewOfUser.reviewerIcon}
                                            reviewerName={this.state.reviewOfUser.reviewerName}
                                            reviewDate={this.state.reviewOfUser.reviewDate}
                                            reviewText={this.state.reviewOfUser.reviewText}
                                            reviewComments={this.state.reviewOfUser.reviewComments}
                                            reviewRating={this.state.reviewOfUser.reviewRating}/>
                </div>
            )
            horizontalBreakline = (
                <div className='viewBookUserReviewBreaklineContainer' >
                    <hr className='viewBookUserReviewBreakline' />
                </div>
            )
        } else {
            reviewOfUser = (
                <div className='viewBookAddReviewContainer' onClick={this.handleAddReview}>
                    <p className='viewBookUserReviewHeader'>Add Your Own Review!</p>
                    <FaPlusCircle className="viewBookAddReviewIcon"
                                size={124}/>
                </div>
            )
        }

        if(this.state.numberOfReviewsDisplayed === null) {
            let numberOfReviews = null;
            if(this.state.reviews.length > 1) {
                numberOfReviews = 1;
                this.setState({ numberOfReviewsDisplayed: 1 });
            } else {
                numberOfReviews = this.state.reviews.length;
                this.setState({ numberOfReviewsDisplayed: this.state.reviews.length, showMoreReviewsButtonVisible: 'none'});
            }
            this.setState({ reviewsDisplayed: this.state.reviews.slice(0, numberOfReviews)});
        }


        let reviewsOfOther = null;
        if(this.state.reviewsDisplayed !== null) {
            reviewsOfOther = (
                <div className='viewBookOtherReviewsContainer'>
                    {this.state.reviewsDisplayed.map((review, index) => {
                        if(review.reviewerID !== this.state.user.userID){
                            return (
                                <ViewBookOtherReviewCard    click={this.handleOtherReviewClicked.bind(this,review)}
                                                            key={index}
                                                            reviewerID={review.reviewerID}
                                                            reviewerIcon={review.reviewerIcon}
                                                            reviewerName={review.reviewerName}
                                                            reviewDate={review.reviewDate}
                                                            reviewText={review.reviewText}
                                                            reviewComments={review.reviewComments}
                                                            reviewRating={review.reviewRating}/>
                            );
                        }
                        return null;
                    })}
                </div>
            );
        }


        return(
            <div className='viewBookBackgroundSection'>
                <div className='viewBookBackgroundFilterSection'>
                    <div className='viewBookMainContainer'>
                        <p className='viewBookHeader'>{this.state.book.bookName}</p>
                        <div className='viewBookBreaklineContainer' >
                            <hr className='viewBookBreakline' />
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
                                {reviewOfUser}
                                {horizontalBreakline}
                                <div className='viewBookOtherReviewsContainer'>
                                    {reviewsOfOther}
                                    <button className='viewBookShowReviewsButton' style={{ display: this.state.showMoreReviewsButtonVisible}} onClick={this.handleShowMoreReviews}>
                                        Show More Reviews 
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

export default withRouter(ViewBook);