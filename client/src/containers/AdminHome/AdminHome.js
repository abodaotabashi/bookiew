import React, { Component } from 'react';
import "../Home/Home.css";
import AnimatedNumber from 'react-animated-number';
import { FaPlusCircle } from 'react-icons/fa';
import SearchIcon from "../../assets/icons/search_30px.png";
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router-dom";
import axios from 'axios';
//import { response } from '../../../../server/app';

class Home extends Component {
    state ={
        searchedBook: '',
        numberOfNewRecommendations: 0,
        recommendations:  null,
    }
 
    handleSearchBook = () => {
        this.props.history.push({
            pathname: '/adminpanel/searchResults',
            state: { searchedBook: this.state.searchedBook }});
    };

    handleAddBook = () => {
        this.props.history.push({ pathname: '/adminpanel/addBook' });
    };

    handleGoToRecommendations = () => {
        this.props.history.push(
            {
                pathname: '/adminpanel/recommendations'
            }
        );
    };

    getNumberOfRecommendations = async () => {
        //TODO
        const result  = await axios.post("http://localhost:3000/getSugNo", {
            message:'hello bro'
        });
        console.log(result.data.resposne); 
        if (result.data.resposne) { 
            this.setState({numberOfNewRecommendations: result.data.lengthOfSug}); 
            console.log(result.data.lengthOfSug);
            console.log('suggestions found');
        }
    };

           
    handleGetRecs = async() =>{
        //console.log("handle get recs!")
        if(this.state.numberOfNewRecommendations === 0){
            const res = await axios.post("http://localhost:3000/getRecs")
            localStorage.setItem('recommendations', JSON.stringify(res.data.recs));
            this.setState({numberOfNewRecommendations: JSON.parse(localStorage.getItem('recommendations')).length})
            this.setState({recommendations: JSON.parse(localStorage.getItem('recommendations'))}, ()=>{console.log(this.state.recommendations)});
            
        }else{
            console.log("wrong!")
        }

    }
    render(){
       
        this.handleGetRecs()
        const { t } = this.props;
        //this.handleGetSuggestionsNO();
        //this.getNumberOfRecommendations();
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
                                <h2>{t('admin_home.message')}</h2>
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
                        <div className='homeAddBookContainer'>
                            <div className='viewBookAddReviewContainer' onClick={this.handleAddBook}>
                                <p className='viewBookUserReviewHeader'>{t('admin_home.add_new_book')}</p>
                                <FaPlusCircle className="viewBookAddReviewIcon"
                                            size={124}/>
                            </div>
                        </div>
                        <div className='homeBreaklineContainer' >
                            <hr className='homeBreakline' />
                        </div>
                        <div className='homeRecommendationsContainer'>
                            <div className='homeRecommendationsSection'>
                                <p className='homeRecommendationsCounterLabel'>
                                    {t('admin_home.notification')}
                                </p>
                                <AnimatedNumber
                                    className='homeRecommendationsCounter'
                                    value={this.state.numberOfNewRecommendations}
                                    formatValue={n => n.toFixed(0)}
                                    frameStyle={percentage => percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}}
                                    duration={800}
                                />
                            </div>
                            <div className='homeRecommendationsButtonWrapper'>
                                <button className='homeRecommendationsButton' onClick={this.handleGoToRecommendations}>{t('admin_home.goTo')} ▶</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(Home));