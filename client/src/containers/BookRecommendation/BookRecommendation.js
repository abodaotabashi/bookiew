import React, { Component } from 'react';
import "./BookRecommendation.css";

import { withTranslation } from 'react-i18next';

class BookRecommendation extends Component {
    state = {
        bookname: '',
        author: '',
        publishingyear: '',
        note: '',
        errorMessage: '',
        errorVisible: 'none'
    }

    handleSendRecommendation = () => {
        //TODO
    }

    render(){
        const { t } = this.props;
        return(
            <div className='recommendationBackgroundSection'>
                <div className='recommendationBackgroundFilterSection'>
                    <div className='recommendationSectionsContainer'>
                        <div className='recommendationSection'>
                            <p className='recommendationSectionHeader'>{t('book_recomm.title')}</p>
                            <table className='recommendationInputTable'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p className='recommendationInputLabel'>{t('book_recomm.name')}</p>
                                        </td>
                                        <td>
                                        <input  className='recommendationInputText' 
                                                type='text' 
                                                name=''
                                                required value={this.state.bookname} 
                                                onChange={(event) => this.setState({bookname: event.target.value})}  
                                                placeholder='Name of Book' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className='recommendationInputLabel'>{t('book_recomm.author')}</p>
                                        </td>
                                        <td>
                                        <input  className='recommendationInputText' 
                                                type='text' 
                                                name=''
                                                required value={this.state.author} 
                                                onChange={(event) => this.setState({author: event.target.value})}  
                                                placeholder='Author(s) of Book' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className='recommendationInputLabel'>{t('book_recomm.year_of_pub')}</p>
                                        </td>
                                        <td>
                                        <input  className='recommendationInputText' 
                                                type="number" 
                                                min="1900" max="2022"
                                                required value={this.state.publishingyear} 
                                                onChange={(event) => this.setState({publishingyear: event.target.value})}  
                                                placeholder='Year of Publication (YYYY)' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className='recommendationInputLabel'>{t('book_recomm.add_note')}</p>
                                        </td>
                                        <td>
                                            <textarea   className='recommendationInputText' 
                                                        name="note"
                                                        maxLength="200"
                                                        value={this.state.note} 
                                                        onChange={(event) => this.setState({note: event.target.value})} 
                                                        placeholder='Leave us a note :)' />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='recommendationErrorMessage' style={{ display: this.state.errorVisible}}>{this.state.errorMessage}</div>
                            <button className='recommendationSendButton' onClick={this.handleSendRecommendation}>Send Recommendation</button>
                            <div className='recommendationBreaklineContainer' >
                                <hr className='recommendationBreakline' />
                            </div>
                            <p className='recommendationThankSpan'>{t('book_recomm.appreciate')}</p>
                            <p className='recommendationHeart'>💗</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(BookRecommendation);