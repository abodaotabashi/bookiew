import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';

import AcknowledgementDialog from '../../components/Dialogs/AcknowledgementDialog';

import ThumbnailTest from "../../assets/images/thumbnailtest.png";
import "./AdminAddBook.css";

class AdminAddBook extends Component { 
    state = {
        bookname: (this.props.recommendedBook !== null ) ? this.props.recommendedBook.bookname : '',
        author: (this.props.recommendedBook !== null ) ? this.props.recommendedBook.author : '',
        publishingyear: (this.props.recommendedBook !== null ) ? this.props.recommendedBook.publishingyear : '',
        publisher: '',
        subject: '',
        category: '',
        language: '',
        coverURL: '',
        errorMessage: '',
        errorVisible: 'none',
        openAckDialog: false
    }

    handleAddBook = async () => {
        this.clearErrors();
        if (this.state.bookname.trim() === '' || this.state.author.trim() === '' || this.state.publishingyear.trim() === '' || this.state.publisher.trim() === '' 
            || this.state.subject.trim() === '' || this.state.category.trim() === '' || this.state.language.trim() === '') {
            this.setState({ 
                errorMessage: 'Information(s) of the book are missing!',
                errorVisible: 'flex'   
            });
        } else {
            const result = await axios.post("http://localhost:3000/adminPanel/addBook", {
                bookName: this.state.bookname.trim(),
                author: this.state.author.trim(),
                yearOfPub: this.state.publishingyear.trim(),
                publisher: this.state.publisher.trim(),
                category: this.state.category.trim(),
                subject: this.state.subject.trim(),
                language: this.state.language.trim(),
                coverURL: this.state.coverURL.trim()
            });
            if (result.data.response) {
                this.setState({openAckDialog: true});
            }
        }
    }

    clearErrors = () => {
        this.setState({
            errorMessage: '',
            errorVisible: 'none'
        });
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/adminpanel/login' });
    }

    render(){
        if(localStorage.getItem('isAdminAuthenticated') === 'false'){
            this.goToLogin();
        }
        
        const { t } = this.props;
        return(
            <div className='adminAddBookBackgroundSection'>
                <div className='adminAddBookBackgroundFilterSection'>
                    <div className='adminAddBookSectionsContainer'>
                        <div className='adminAddBookSection'>
                            <p className='adminAddBookSectionHeader'>{t('admin_add_book.title')}</p>
                            <div className='adminAddBookWrapper'>
                                <div className='adminAddBookCoverSection'>
                                    <div className='adminAddBookThumbnailWrapper'>
                                        <img src={(this.state.coverURL === '') ? ThumbnailTest : this.state.coverURL} className='adminAddBookThumbnail' alt=''/>
                                    </div>
                                    <p className='adminAddBookCoverLabel'>{t('admin_add_book.book_preview')}</p>
                                </div>
                                <div className='adminAddBookVerticalBreakline'></div>
                                <table className='adminAddBookInputTable'>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>{t('admin_add_book.book_name')}</p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.bookname} 
                                                    onChange={(event) => this.setState({bookname: event.target.value})}  
                                                    placeholder={t('placeholders.name_of_book')} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>{t('admin_add_book.author')}</p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.author} 
                                                    onChange={(event) => this.setState({author: event.target.value})}  
                                                    placeholder={t('placeholders.author_of_book')}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>{t('admin_add_book.year_of_pub')}</p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type="number" 
                                                    min="1900" max="2022"
                                                    required value={this.state.publishingyear} 
                                                    onChange={(event) => this.setState({publishingyear: event.target.value})}  
                                                    placeholder={t('placeholders.year_of_pub')} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>{t('admin_add_book.publisher')}</p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.publisher} 
                                                    onChange={(event) => this.setState({publisher: event.target.value})}  
                                                    placeholder={t('placeholders.publisher')} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>{t('admin_add_book.category')}</p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.category} 
                                                    onChange={(event) => this.setState({category: event.target.value})}  
                                                    placeholder={t('placeholders.category')} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>{t('admin_add_book.subject')}</p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.subject} 
                                                    onChange={(event) => this.setState({subject: event.target.value})}  
                                                    placeholder={t('placeholders.subject')} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>{t('admin_add_book.language')}</p>
                                            </td>
                                            <td>
                                                <input  className='adminAddBookInputText' 
                                                        list="languages"
                                                        required value={this.state.language} 
                                                        onChange={(event) => this.setState({language: event.target.value})}  
                                                        placeholder={t('placeholders.language')} />
                                                <datalist id="languages">
                                                    <option value="Arabic"/>
                                                    <option value="Chinese"/>
                                                    <option value="Dutch"/>
                                                    <option value="English"/>
                                                    <option value="French"/>
                                                    <option value="German"/>
                                                    <option value="Greek"/>
                                                    <option value="Hindi"/>
                                                    <option value="Indonesian"/>
                                                    <option value="Italien"/>
                                                    <option value="Japanese"/>
                                                    <option value="Korean"/>
                                                    <option value="Persian"/>
                                                    <option value="Polish"/>
                                                    <option value="Portuguese"/>
                                                    <option value="Romanian"/>
                                                    <option value="Russian"/>
                                                    <option value="Spanish"/>
                                                    <option value="Thai"/>
                                                    <option value="Turkish"/>
                                                    <option value="Ukrainian"/>
                                                    <option value="Urdu"/>
                                                    <option value="Vietnamese"/>
                                                </datalist>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>{t('admin_add_book.cover_url')}</p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    value={this.state.coverURL} 
                                                    onChange={(event) => this.setState({coverURL: event.target.value})}  
                                                    placeholder={t('placeholders.cover_url')} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='adminAddBookErrorMessage' style={{ display: this.state.errorVisible}}>{this.state.errorMessage}</div>
                            <button className='adminAddBookSendButton' onClick={this.handleAddBook}>{t('admin_add_book.add_button')}</button>
                        </div>
                    </div>
                    <AcknowledgementDialog  openAckDialog={this.state.openAckDialog}
                                    content= {t('dialogs.admin_add_book')}
                                    ok="Ok"
                                    okFunction={() => { this.setState({openWarningDialog: false});
                                                        this.props.history.push({ pathname: '/adminpanel/' });}}>
                    </AcknowledgementDialog>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(AdminAddBook));