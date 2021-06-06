import React, { Component } from 'react';
import "./Home.css";

import SearchIcon from "../../assets/icons/search_30px.png";
//import ThumbnailTest from "../../assets/images/thumbnailtest.png";
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";

import { FaTimesCircle } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import HomeReviewCard from '../../components/HomeReviewCard/HomeReviewCard';
import { withTranslation } from 'react-i18next';


class Home extends Component {
    state = {
        searchedBook: '',
        lastReview: null,
        lastReviewedBook: null,
        reviewComments: null,
        numberOfCommentDisplayed: null,
        reviewCommentsDisplayed: null,
        showMoreCommentsButtonVisible: 'none',
    }

    
    handleGetComments = async(review) => {
        let reviewID = review.reviewID;
        if(reviewID !== null){
            const emir = await axios.post('http://localhost:3000/getComments',{reviewID: reviewID});
            if (emir.data.response) {
                const comments = emir.data.comments;
                this.setState({reviewComments: comments});
                if(this.state.numberOfCommentDisplayed === null) {
                    let numberOfReviews = null;
                    if(comments.length >= 1) {
                        numberOfReviews = 1;
                        this.setState({ numberOfCommentDisplayed: 1,
                            showMoreCommentsButtonVisible: 'flex'});
                    } else {
                        this.setState({ numberOfCommentDisplayed: comments.length});
                    }
                    this.setState({ reviewCommentsDisplayed: comments.slice(0, numberOfReviews)});
                }
            }
        } else {
            console.log("review bulunamadi")
        }
    }
    
    handleGetLastReview = async() => {
        const userID = localStorage.getItem('userID');
        if(this.state.lastReview === null){
            const lastReviewRequest = await axios.post('http://localhost:3000/getlastReview',{userID: userID});
            if(lastReviewRequest.data.response){    
                const lastReview = lastReviewRequest.data.lastReview;
                this.setState({ lastReview: lastReview});
                const bookResult = await axios.post("http://localhost:3000/getBook", {
                    bookID: lastReview.reviewBookID
                })
                const book = bookResult.data.book;
                this.setState({ lastReviewedBook: book});
                this.handleGetComments(lastReview);
            }else{
                console.log(lastReviewRequest.data.message);
            }
        }
    }

    handleReviewClicked = (reviewID) => {
        this.props.history.push({
            pathname: '/viewReview',
            state: { reviewID: reviewID}});
        return;
    }

    handleSearchBook = () => {
        this.props.history.push({
            pathname: '/searchResults',
            state: { searchedBook: this.state.searchedBook }});
    };

    handleShowMoreComments = () => {
        if(this.state.reviewComments.length <= this.state.numberOfCommentDisplayed + 3) {
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
    
    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }

        this.handleGetLastReview();
        const { t } = this.props;
        
        const userProfilePhotoURL = localStorage.getItem('userProfilePhotoURL');
        const userFirstname = localStorage.getItem('userFirstname');
        
        let lastReview = null;

        if(this.state.lastReview !== null && this.state.lastReviewedBook !== null){
            lastReview = (
                <div className='homeRecentReviewSection'>
                    <h2 className='homeRecentReviewHeader'>{t('home.Your_Last_Review')}</h2>
                        <div className='myReviewsBookCardsContainer'>
                            <HomeReviewCard   
                                key={this.state.lastReview.reviewID}
                                reviewerIcon={userProfilePhotoURL}
                                reviewerName={userFirstname}
                                reviewText= {this.state.lastReview.reviewText}
                                reviewDate={this.state.lastReview.reviewDate}
                                reviewRating={this.state.lastReview.reviewRating}
                                className='myReviewsBookCard'
                                bookName={this.state.lastReviewedBook.bookName}
                                bookAuthor={this.state.lastReviewedBook.bookAuthor}
                                bookThumbnail={this.state.lastReviewedBook.bookThumbnail}
                                reviewComments={this.state.reviewCommentsDisplayed}
                                reviewCommentsNumber={(typeof(this.state.reviewComments) === 'undefined' || this.state.reviewComments === null) ? 0 : this.state.reviewComments.length}
                                click={this.handleReviewClicked.bind(this, this.state.lastReview.reviewID)}
                            />
                        </div>
                    <button className='homeRecentReviewShowCommentsButton' style={{ display: this.state.showMoreCommentsButtonVisible}} onClick={this.handleShowMoreComments}>
                        {t('home.Show_More_Comments')}
                        <img src={ExpandIcon} className='homeRecentReviewShowCommentsButtonIcon' alt='ShowCommentsIcon'/>
                    </button>
                </div>
            );
        } else {
            lastReview = (
                <div className='searchResultsBookCardsContainer'>
                    <div className='searchResultsNoResultsSection'>
                        <FaTimesCircle size={148} color='#341f97'/>
                        {t('home.no_reviews')}😭
                    </div>
                </div>
            );
        }


        return(
            <div className='homeBackgroundSection'>
                <div className='homeBackgroundFilterSection'>
                    <div className='homeSectionsContainer'>
                        <div className='homeSearchSection'>
                            <div className='homeSearchText'>
                                <h2>{t('home.question')}</h2>
                                <p>▶&nbsp; {t('home.after_question')} 😉</p>
                            </div>
                            <div className='homeSearchBoxContainer'>
                                <div className='homeSearchBox'>
                                    <input className='homeSearchBoxText' type='text' name='' placeholder={t('placeholders.search')} onChange={(event) => this.setState({searchedBook: event.target.value})}/>
                                    <button className='homeSearchBoxButton' onClick={this.handleSearchBook}>
                                        <img src={SearchIcon} alt='Search'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='homeBreaklineContainer' >
                            <hr className='homeBreakline' />
                        </div>
                        {lastReview}
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(Home));
