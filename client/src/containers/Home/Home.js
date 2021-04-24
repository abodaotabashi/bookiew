import React, { Component } from 'react';
import "./Home.css";

import SearchIcon from "../../assets/icons/search_30px.png";
import UserIcon from "../../assets/icons/user.png";
import ThumbnailTest from "../../assets/images/thumbnailtest.png"

import HomeReviewCard from '../../components/HomeReviewCard/HomeReviewCard';

class Home extends Component {
    state ={
        userName: '',
        searchedBook: '',
        lastReviewText:'',
        lastReviewDate: null,
        lastReviewedBook: null,
    }

    handleSearchBook = () => {
        //TODO
    };

    render(){
        return(
            <div className='homeBackgroundSection'>
                <div className='homeBackgroundFilterSection'>
                    <div className='homeSectionsContainer'>
                        <div className='homeSearchSection'>
                            <div className='homeSearchText'>
                                <h2>Have You Read Recently A New Book?</h2>
                                <p>▶&nbsp; Search it and add your personal review to help another readers! 😉</p>
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
                            <div className='homeRecentReviewContainer'>
                                <HomeReviewCard reviewerIcon={UserIcon}
                                    reviewerName='Abdurrahman ODABAŞI'
                                    reviewText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                                    reviewDate='20.04.2021'
                                    bookName='Bookiew for new Beginning'
                                    bookAuthor='Betül, Fatma, Mahasin, Nazlı, Sena, Abdurrahman'
                                    bookThumbnail={ThumbnailTest}
                                    />
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;