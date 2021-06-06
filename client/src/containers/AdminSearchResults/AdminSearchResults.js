import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import axios from 'axios';

import BookCard from '../../components/BookCard/BookCard';

import SearchIcon from "../../assets/icons/search_30px.png";
import { FaTimesCircle } from 'react-icons/fa';
import "../SearchResults/SearchResults.css";

class AdminSearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedBook: this.props.searchedBook,
            books: [],
            loading: false,
            toSearchBook: this.props.searchedBook,
        }
        this.handleSearchBook();
    }
    

    handleBookClicked = async (bookID) => {
        const result = await axios.post("http://localhost:3000/getBook", {
            bookID:bookID
        })
        if (result.data.response) {
            let book = result.data.book;
            this.props.history.push({
                pathname: '/adminpanel/updateBook',
                state: {book: book}
            })
        }
    }

    handleSearchClicked = () => {
        this.setState({searchedBook: this.state.toSearchBook, loading: true});
        this.handleSearchBook();
    }

    handleSearchBook = async () => {
        this.setState({books: []})
        console.log("searched book: " + this.state.toSearchBook)
        const result = await axios.post("http://localhost:3000/search",{
            searchedBook: this.state.toSearchBook
        })
        if(result.data.response){
            if(result.data.message.length === 0){ 
                console.log("loading will be false")
            }else{
                console.log("the message of searched book below: ")
                console.log(result.data.message)
                let i =0;
                for(i=result.data.message.length;i>0;i--){
                    this.setState({books: this.state.books.concat(result.data.message[i-1])})
                }
            }
        }else{
            console.log("response: " + result.data.response)
            console.log("the message: " + result.data.message);
        }
        this.setState({loading:false});
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/adminpanel/login' });
    }

    render(){
        if(localStorage.getItem('isAdminAuthenticated') === 'false'){
            this.goToLogin();
        }
        
        let books = null;
        const { t } = this.props;

        if(!this.state.loading) {
            if(this.state.books.length !== 0){
                books = (<div className='searchResultsBookCardsContainer'>
                            {this.state.books.map((book) => {
                                return (
                                    <BookCard   
                                        key={book.bookID}
                                        className='searchResultsBookCard'
                                        bookName={book.bookName}
                                        bookAuthor={book.author}
                                        bookThumbnail={book.bookCoverURL}
                                        click={this.handleBookClicked.bind(this, book.bookID)}
                                    />
                                );
                            })}
                        </div>);
            } else {
                books = (<div className='searchResultsBookCardsContainer'>
                            <div className='searchResultsNoResultsSection'>
                                <FaTimesCircle size={148} color='#341f97'/>
                                {t('admin_search.no_result')} 😟
                            </div>
                        </div>);
            }
        } else {
            books = (<div className='searchResultsBookCardsContainer'>
                        <div className='adminSearchResultsPreloader'></div>
                    </div>);
        }
        

        let searchedBook= this.state.searchedBook;
        
        return(
            <div className='searchResultsBackgroundSection'>
                <div className='adminSearchResultsBackgroundFilterSection'>
                    <div className='searchResultsSectionsContainer'>
                        <div className='searchResultsHeaderSection'>
                            <div className='searchResultsHeader'>
                                <p className='searchResultsHeaderText'>{t('admin_search.search_results')}</p>
                            </div>
                            <div className='searchResultsSearchBoxContainer'>
                                <div className='searchResultsSearchBox'>
                                    <input className='searchResultsSearchBoxText' type='text' name='' placeholder={t('placeholders.search')} value={this.state.toSearchBook} onChange={(event) => this.setState({ toSearchBook : event.target.value })}/>
                                    <button className='searchResultsSearchBoxButton' onClick={this.handleSearchClicked}>
                                        <img src={SearchIcon} alt='Search'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='searchResultsBreaklineContainer' >
                            <hr className='searchResultsBreakline' />
                        </div>
                        <p className='searchResultsNumResults'>{this.state.books.length} {t('admin_search.results_for')} "{searchedBook}" :</p>
                        <div className='searchResultsBookCardsContainer'>
                            {books}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(AdminSearchResults));