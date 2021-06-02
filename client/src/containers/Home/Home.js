import React, { Component } from 'react';
import "./Home.css";

import SearchIcon from "../../assets/icons/search_30px.png";
import UserIcon from "../../assets/icons/user.png";
import ThumbnailTest from "../../assets/images/thumbnailtest.png";
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import HomeReviewCard from '../../components/HomeReviewCard/HomeReviewCard';
import { withTranslation } from 'react-i18next';

import BookCard from '../../components/BookCard/BookCard';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedBook: '',
            lastReviewText:'',
            lastReviewDate: null,
            lastReviewedBook: null,
            reviewComments: '',
            numberOfCommentDisplayed: null,
            reviewCommentsDisplayed: null,
            showMoreCommentsButtonVisible: 'flex',
            reviews : null,
            rev: null,
            
        }
        this.handleGetReviews();
        
    }
      

    handleGetComments = async() => {

        if(this.state.lastReviewedBook !== null) {
            let reviewID = this.state.lastReviewedBook.reviewID;
            
            if(reviewID !== null){
                const emir = await axios.post('http://localhost:3000/getComments',{reviewID: reviewID});
    
                if (emir.data.response) {
                    const comments = emir.data.comments;
                   console.log(comments);
                    this.state.reviewComments = comments;
                } 
    
            } else {
                console.log("review bulunamadi")
            }
        }

        
    }
    
    handleGetReviews = async(props) => {
        const userID = localStorage.getItem('userID');
        
        if(this.state.reviews === null){
            const emir = await axios.post('http://localhost:3000/myReviews',{userID: userID});
            //let reviews = [];
            if (emir.data.response) {
                const myReviews = emir.data.displayedBooks;
               // console.log(myReviews[myReviews.length-1])
                let rev =  myReviews[myReviews.length-1];

                this.setState({
                    rev: rev
                }, () => {
                    console.log(rev);
                });

                let reviewID = rev.reviewID;
                const res = await axios.post('http://localhost:3000/lastReview',{reviewID: reviewID});
                if(res.data.response){
                   
                    let lastReview = res.data.review[0];
                    console.log("lastrev: ")
                    console.log(lastReview);
                    this.setState({ lastReviewedBook: res.data.review[0]});
                    console.log("bu sefer:  " + res.data.review[0])
                    this.handleGetComments();
                    
                }else{
                    console.log("hata")
                }
                
            }
        }
        
        
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
    
    render(){
       
        const { t } = this.props;
        
        const userProfilePhotoURL = localStorage.getItem('userProfilePhotoURL');
        const userFirstname = localStorage.getItem('userFirstname');
        
        if(this.state.numberOfCommentDisplayed === null) {
            let numberOfReviews = null;
            if(this.state.reviewComments.length >= 1) {
                numberOfReviews = 1;
                this.setState({ numberOfCommentDisplayed: 1 });
            } else {
                this.setState({ numberOfCommentDisplayed: this.state.reviewComments.length});
            }
            this.setState({ reviewCommentsDisplayed: this.state.reviewComments.slice(0, numberOfReviews)});
        }

        let book = null;

        if(this.state.rev!==null && this.state.lastReviewedBook!==null){
            book = (
                <div className='myReviewsBookCardsContainer'>
                 <HomeReviewCard   
                    key={this.state.rev.reviewID}
                    reviewerName={userFirstname}
                    reviewText= {this.state.lastReviewedBook.reviewText}
                    reviewDate={this.state.lastReviewedBook.reviewDate}
                    reviewRating={this.state.lastReviewedBook.reviewRating}
                    className='myReviewsBookCard'
                    bookName={this.state.rev.bookName}
                    bookAuthor={this.state.rev.bookAuthor}
                    bookThumbnail={this.state.rev.bookThumbnail}
                    reviewComments={this.state.reviewCommentsDisplayed}
                    // click={this.handleReviewClicked.bind(this, review.reviewID)}
                />
                
                
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
                                    <input className='homeSearchBoxText' type='text' name='' placeholder='Search' onChange={(event) => this.setState({searchedBook: event.target.value})}/>
                                    <button className='homeSearchBoxButton' onClick={this.handleSearchBook}>
                                        <img src={SearchIcon} alt='Search'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='homeBreaklineContainer' >
                            <hr className='homeBreakline' />
                        </div>
                        <div className='homeRecentReviewSection'>
                            <h2 className='homeRecentReviewHeader'>Your Last Review</h2>
                            
                            {/*book*/} 
                            <button className='homeRecentReviewShowCommentsButton' style={{ display: this.state.showMoreCommentsButtonVisible}} onClick={this.handleShowMoreComments}>
                                    Show More Comments 
                                    <img src={ExpandIcon} className='homeRecentReviewShowCommentsButtonIcon' alt='ShowCommentsIcon'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(Home));
