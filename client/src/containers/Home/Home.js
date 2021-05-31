import React, { Component } from 'react';
import "./Home.css";

import SearchIcon from "../../assets/icons/search_30px.png";
import UserIcon from "../../assets/icons/user.png";
import ThumbnailTest from "../../assets/images/thumbnailtest.png";
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";

import { withRouter } from 'react-router-dom';

import HomeReviewCard from '../../components/HomeReviewCard/HomeReviewCard';
import { withTranslation } from 'react-i18next';



class Home extends Component {
    state = {
        searchedBook: '',
        lastReviewText:'',
        lastReviewDate: null,
        lastReviewedBook: null,
        reviewComments: this.props.reviewComments,
        numberOfCommentDisplayed: null,
        reviewCommentsDisplayed: null,
        showMoreCommentsButtonVisible: 'flex',
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
        const userProfilePhotoURL = localStorage.getItem('userProfilePhotoURL');
        const userFirstname = localStorage.getItem('userFirstname');
        
        const { t } = this.props;
        
        if(this.state.numberOfCommentDisplayed === null) {
            let numberOfReviews = null;
            if(this.props.reviewComments.length >= 1) {
                numberOfReviews = 1;
                this.setState({ numberOfCommentDisplayed: 1 });
            } else {
                this.setState({ numberOfCommentDisplayed: this.props.reviewComments.length});
            }
            this.setState({ reviewCommentsDisplayed: this.props.reviewComments.slice(0, numberOfReviews)});
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
                            <h2 className='homeRecentReviewHeader'>{t('home.Your_Last_Review')}</h2>
                            <div className='homeRecentReviewContainer'>
                                    <HomeReviewCard reviewerIcon={(userProfilePhotoURL === '') ? UserIcon : userProfilePhotoURL}
                                        reviewerName={userFirstname}
                                        reviewText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                                        reviewDate='20.04.2021'
                                        reviewRating='4.3'
                                        bookName='Bookiew for new Beginning'
                                        bookAuthor='Betül, Fatma, Mahasin, Nazlı, Sena, Abdurrahman'
                                        bookThumbnail={ThumbnailTest}
                                        reviewComments={this.state.reviewCommentsDisplayed}
                                        />
                                    <button className='homeRecentReviewShowCommentsButton' style={{ display: this.state.showMoreCommentsButtonVisible}} onClick={this.handleShowMoreComments}>
                                        {t('home.Show_More_Comments')}
                                        <img src={ExpandIcon} className='homeRecentReviewShowCommentsButtonIcon' alt='ShowCommentsIcon'/>
                                    </button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(Home));
