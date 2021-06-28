import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import axios from 'axios';

import WarningDialog from '../../components/Dialogs/WarningDialog';

import { FaTimesCircle } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";
import "./AdminRecommendations.css";

class AdminRecommendations extends Component {
    state = {
            recommendations: null,
            numberOfRecommendationsDisplayed: null,
            recommendationsDisplayed: null,
            showMoreRecommendationsButtonVisible: 'none',
            openWarningDialog: false,
            recommendationToDelete: null
        }

    handleShowMoreRecommendations = () => {
        if(this.state.recommendations.length <= this.state.numberOfRecommendationsDisplayed + 3) {
            this.setState({ numberOfRecommendationsDisplayed: this.state.recommendations.length,
                            recommendationsDisplayed: this.state.recommendations,
                            showMoreRecommendationsButtonVisible: 'none'
                        });
        } else {
            let numberOfRecommendations = this.state.numberOfRecommendationsDisplayed + 3;
            this.setState({ numberOfRecommendationsDisplayed: numberOfRecommendations,
                recommendationsDisplayed: this.state.recommendations.slice(0, numberOfRecommendations)
                });
        }
    }

    handleGetAllRecommendations = async() => {
        const recommendations = await axios.post("http://localhost:3000/getRecommendations");
        if(recommendations.data.response){
            this.setState({ recommendations: recommendations.data.recommendations });
            if(this.state.numberOfRecommendationsDisplayed === null) {
                let numberOfRecommendations = null;
                if(recommendations.data.recommendations.length > 3) {
                    numberOfRecommendations = 3;
                    this.setState({ numberOfRecommendationsDisplayed: numberOfRecommendations,
                        showMoreRecommendationsButtonVisible: 'flex',
                        recommendationsDisplayed: recommendations.data.recommendations.slice(0, numberOfRecommendations) });
                } else {
                    this.setState({ numberOfRecommendationsDisplayed: recommendations.data.recommendations.length, 
                        showMoreRecommendationsButtonVisible: 'none',
                        recommendationsDisplayed: recommendations.data.recommendations});
                }
                
            }  
        }
    }

    handleCopyInfosToAddBook = (recommendation) => {
        this.props.history.push({
            pathname: '/adminpanel/addBook',
            state: { recommendedBook:{ 
                        bookname: recommendation.suggestionBook, 
                        author: recommendation.suggestionAuthor, 
                        publishingyear: recommendation.suggestionPublishingYear
                        }
            }
        });
    }

    handleDeleteRecommendation = async(recommendation) => {
        const result = await axios.post("http://localhost:3000/deleteRecommendation", {
            sugID: recommendation.suggestionID });
        if(result.data.response){
            this.setState({
                recommendations: null,
                numberOfRecommendationsDisplayed: null,
                recommendationsDisplayed: null,
                showMoreRecommendationsButtonVisible: 'none'
            });
        }else{
            console.log("something went wrong!") 
        }
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/adminpanel/login' });
    }

    render(){
        if(localStorage.getItem('isAdminAuthenticated') === 'false'){
            this.goToLogin();
        }
        
        if(this.state.recommendations === null){
            this.handleGetAllRecommendations();
        }
        const { t } = this.props;

        let recommendations = null;
        if(this.state.recommendationsDisplayed !== null){
            recommendations = (
                <div className='adminRecommendationsContainer'>
                    <table className='adminRecommendationsTable'>
                        <tbody>
                            <tr>
                                <th>
                                    <div className='adminRecommendationsTableLabel'>{t('admin_recomm.recommender')}</div>
                                </th>
                                <th>
                                    <div className='adminRecommendationsTableLabel'>{t('admin_recomm.recommended_book')}</div>
                                </th>
                                <th>
                                    <div className='adminRecommendationsTableLabel'>{t('admin_recomm.recommended_book_author')}</div>
                                </th>
                                <th>
                                    <div className='adminRecommendationsTableLabel'>{t('admin_recomm.year_od_pub')}</div>
                                </th>
                                <th>
                                    <div className='adminRecommendationsTableLabel adminRecommendationsTableRowFlex2' >{t('admin_recomm.recommenders_note')}</div>
                                </th>
                                <th> 
                                    <div className='adminRecommendationsTableLabel'>{t('admin_recomm.delete_add_book')}</div>
                                </th>
                            </tr>
                            {this.state.recommendationsDisplayed.map((recommendation) => {
                                return (
                                    <tr key={recommendation.suggestionID} >
                                        <td>
                                            <p className='adminRecommendationsTableInput'>{recommendation.suggestionUserName}</p>
                                        </td>
                                        <td>
                                            <p className='adminRecommendationsTableInput'>{recommendation.suggestionBook}</p>
                                        </td>
                                        <td>
                                            <p className='adminRecommendationsTableInput'>{recommendation.suggestionAuthor}</p>
                                        </td>
                                        <td>
                                            <p className='adminRecommendationsTableInput'>{recommendation.suggestionPublishingYear}</p>
                                        </td>
                                        <td>
                                            <p className='adminRecommendationsTableInput'>{recommendation.suggestionNote}</p>
                                        </td>
                                        <td className='adminRecommendationsButtonsWrapper'>
                                            <div className='adminRecommendationsDeleteButton' onClick={() => {this.setState({openWarningDialog: true, recommendationToDelete: recommendation});}}>
                                                <FaTrash  
                                                    color="#ffffff" 
                                                    size={20}/>
                                            </div>
                                            <div className='adminRecommendationsAddButton' onClick={() => this.handleCopyInfosToAddBook(recommendation)}>
                                                <FaCheck  
                                                    color="#ffffff" 
                                                    size={20}/>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button className='viewReviewShowCommentsButton' style={{ display: this.state.showMoreRecommendationsButtonVisible}} onClick={this.handleShowMoreRecommendations}>
                        {t('admin_recomm.show_more_recomm')}
                        <img src={ExpandIcon} className='viewReviewShowCommentsButtonIcon' alt='ShowCommentsIcon'/>
                    </button>
                </div>
            );
        } else {
            recommendations = (
                <div className='adminRecommendationsContainer'>
                    <div className='adminRecommendationsNoResultsSection'>
                        <FaTimesCircle size={148} color='#341f97'/>
                        {t('admin_recomm.no_recomm')} ✅
                    </div>
                </div>
            );
        }
        
        return(
            <div className='adminRecommendationsBackgroundSection'>
                <div className='adminRecommendationsBackgroundFilterSection'>
                    <div className='adminRecommendationsSectionsContainer'>
                        <div className='adminRecommendationsSection'>
                            <p className='adminRecommendationsSectionHeader'>{t('admin_recomm.received_recom')}</p>
                            {recommendations}
                        </div>
                    </div>
                    <WarningDialog  openWarningDialog={this.state.openWarningDialog}
                                    title='Delete this recommendation?'
                                    content='Are you sure that you want to delete this recommendation permanently?'
                                    yes="Delete"
                                    no="Cancel"
                                    yesFunction={() => {this.handleDeleteRecommendation(this.state.recommendationToDelete); this.setState({openWarningDialog: false});}}
                                    noFunction={() => {this.setState({openWarningDialog: false, recommendationToDelete: null});}}>
                    </WarningDialog>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(AdminRecommendations));