import React, { Component } from 'react';
import "./AdminRecommendations.css";
import { FaTimesCircle } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";


import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';

class AdminRecommendations extends Component {
    state = {
        recommendations: [
            {
                suggestionID: '1',
                suggestionUserID: '1',
                suggestionUserName: 'user MySur',
                suggestionBook: 'Siddharta',
                suggestionAuthor: 'Hermann Hesse',
                suggestionPublishingYear: '1982',
                suggestionNote: 'my fav book'
            },
            {
                suggestionID: '2',
                suggestionUserID: '1',
                suggestionUserName: 'user MySur',
                suggestionBook: 'Steppenwolf',
                suggestionAuthor: 'Hermann Hesse',
                suggestionPublishingYear: '2002',
                suggestionNote: 'Thanks'
            },
            {
                suggestionID: '3',
                suggestionUserID: '1',
                suggestionUserName: 'user MySur',
                suggestionBook: "A Room of One's Own",
                suggestionAuthor: 'Virginia Woolf',
                suggestionPublishingYear: '2019',
                suggestionNote: ''
            },
            {
                suggestionID: '4',
                suggestionUserID: '1',
                suggestionUserName: 'user MySur',
                suggestionBook: 'To the Lighthouse',
                suggestionAuthor: 'Virginia Woolf',
                suggestionPublishingYear: '2020',
                suggestionNote: 'my fav hklhkl l;jasdj hjashdj hkjasdh  shjk hasdjkh jkasdh asdhjkh kjdash aksdhjkasdh '
            }
        ],
        numberOfRecommendationsDisplayed: null,
        recommendationsDisplayed: null,
        showMoreRecommendationsButtonVisible: 'none'
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

    handleGetAllRecommendations = () => {
        //TODO
    }

    handleCopyInfosToAddBook = (recommendation) => {
        this.props.history.push({
            pathname: '/adminpanel/addBook',
            state: { recommendedBook:{ bookname: recommendation.suggestionBook, author: recommendation.suggestionAuthor, publishingyear: recommendation.suggestionPublishingYear}}});
    }

    handleDeleteRecommendation = (recommendation) => {
        //TODO
    }

    render(){
        let recommendations = null;
        const { t } = this.props;

        if(this.state.numberOfRecommendationsDisplayed === null) {
            let numberOfRecommendations = null;
            if(this.state.recommendations.length > 3) {
                numberOfRecommendations = 3;
                this.setState({ numberOfRecommendationsDisplayed: 3,
                    showMoreRecommendationsButtonVisible: 'flex' });
            } else {
                numberOfRecommendations = this.state.recommendations.length;
                this.setState({ numberOfRecommendationsDisplayed: this.state.recommendations.length, showMoreRecommendationsButtonVisible: 'none'});
            }
            this.setState({ recommendationsDisplayed: this.state.recommendations.slice(0, numberOfRecommendations)});
        }
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
                                    <tr key={recommendation.suggestionID}>
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
                                            <div className='adminRecommendationsDeleteButton' onClick={() => this.handleDeleteRecommendation(recommendation)}>
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
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(AdminRecommendations));