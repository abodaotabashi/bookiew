import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {withTranslation} from "react-i18next";
import axios from 'axios';

import BookCard from '../../components/BookCard/BookCard';

import ThumbnailTest from "../../assets/images/thumbnailtest.png";
import SearchIcon from "../../assets/icons/search_30px.png";
import { FaTimesCircle } from 'react-icons/fa';
import "./SearchResults.css";

class SearchResults extends Component {
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
        let book = null;
        const result = await axios.post("http://localhost:3000/getBook", {
            bookID: bookID
        });
        if (result.data.response) {
            book = result.data.book;
        }
        this.props.history.push({
            pathname: '/viewBook',
            state: { book: book }});
        return;
    }

    handleSearchClicked = () => {
        this.setState({searchedBook: this.state.toSearchBook, loading: true});
        this.handleSearchBook();
    }

    handleSearchBook = async () => {
        this.setState({books: []})
        const result = await axios.post("http://localhost:3000/search",{
            searchedBook: this.state.toSearchBook
        })
        if(result.data.response){
            if(result.data.message.length === 0){ 
                console.log("No results!");
            }else{
                let i =0;
                for(i=result.data.message.length;i>0;i--){
                    this.setState({books: this.state.books.concat(result.data.message[i-1])})
                }
            }
        }else{
            console.log(" response: " + result.data.response)
            console.log("the message: " + result.data.message);
        }
        this.setState({loading:false});
    }

    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }
        const {t} = this.props;
        let books = null;
        
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
                                        bookThumbnail={(book.bookCoverURL === '') ? ThumbnailTest : book.bookCoverURL}
                                        click={this.handleBookClicked.bind(this, book.bookID)}
                                    />
                                );
                            })}
                        </div>);
            } else {
                books = (<div className='searchResultsBookCardsContainer'>
                            <div className='searchResultsNoResultsSection'>
                                <FaTimesCircle size={148} color='#341f97'/>
                                {t('search_results.no_results')} 😟
                            </div>
                        </div>);
            }
        } else {
            books = (<div className='searchResultsBookCardsContainer'>
                        <div className='searchResultsPreloader'></div>
                    </div>);
        }
        

        let searchedBook= this.state.searchedBook;
        
        return(
            <div className='searchResultsBackgroundSection'>
                <div className='searchResultsBackgroundFilterSection'>
                    <div className='searchResultsSectionsContainer'>
                        <div className='searchResultsHeaderSection'>
                            <div className='searchResultsHeader'>
                                <p className='searchResultsHeaderText'>{t('search_results.title')}</p>
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
                        <p className='searchResultsNumResults'>{this.state.books.length} {t('search_results.message')} "{searchedBook}" :</p>
                        <div className='searchResultsBookCardsContainer'>
                            {books}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withRouter(SearchResults));
