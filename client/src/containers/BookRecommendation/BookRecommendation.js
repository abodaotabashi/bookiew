import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import AcknowledgementDialog from '../../components/Dialogs/AcknowledgementDialog';

import "./BookRecommendation.css";

class BookRecommendation extends Component {
    state = {
        userID: localStorage.getItem("userID"),
        bookname: '',
        author: '',
        publishingyear: '',
        note: '',
        errorMessage: '',
        errorVisible: 'none',
        openAckDialog: false
    }

    validate = () => {
        if(this.state.bookname==="" || this.state.author==="" || this.state.publishingyear===""){
            this.setState({ 
                errorMessage: 'Please fill out all the fields!',
                errorVisible: 'flex'   
            });
            return false;
        }
        return true;
    }
    clearInputs = () => {
        this.setState({
            errorMessage: '',
            errorVisible: 'none'
        });
    }


    handleSendRecommendation = async() => {
        this.clearInputs();
        if(this.validate()){
            const result = await axios.post("http://localhost:3000/recommend", {
                suggestionUserID: this.state.userID,
                suggestionBook: this.state.bookname,
                suggestionAuthor: this.state.author,
                suggestionPublishingYear: this.state.publishingyear,
                suggestionNote: this.state.note
            })
            if(result.data.response){
                this.setState({openAckDialog: true});
            }
        }  
    }
    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }
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
                                                placeholder={t('placeholders.name_of_book')} />
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
                                                placeholder={t('placeholders.author_of_book')} />
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
                                                placeholder={t('placeholders.year_of_pub')} />
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
                                                        placeholder={t('placeholders.note')} />
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
                    <AcknowledgementDialog  openAckDialog={this.state.openAckDialog}
                                    content= {t('dialogs.book_recomm')}
                                    ok="Ok"
                                    okFunction={() => { this.setState({openAckDialog: false});
                                                        this.props.history.push({ pathname: '/home' });}}>
                    </AcknowledgementDialog>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(BookRecommendation));