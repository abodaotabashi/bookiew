import React, { Component } from 'react';
import "../SearchResults/SearchResults.css";

import SearchIcon from "../../assets/icons/search_30px.png";
import BookCard from '../../components/BookCard/BookCard';
import { FaTimesCircle } from 'react-icons/fa';

import { withRouter } from 'react-router-dom';


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
    

    handleBookClicked = (bookID) => {
        //TODO
    }

    handleSearchClicked = () => {
        this.setState({searchedBook: this.state.toSearchBook, loading: true});
        this.handleSearchBook();
    }

    handleSearchBook = async () => {
        //TODO
    }

    render(){
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
                                No Results 😟
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
                                <p className='searchResultsHeaderText'>Search Results</p>
                            </div>
                            <div className='searchResultsSearchBoxContainer'>
                                <div className='searchResultsSearchBox'>
                                    <input className='searchResultsSearchBoxText' type='text' name='' placeholder='Search' value={this.state.toSearchBook} onChange={(event) => this.setState({ toSearchBook : event.target.value })}/>
                                    <button className='searchResultsSearchBoxButton' onClick={this.handleSearchClicked}>
                                        <img src={SearchIcon} alt='Search'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='searchResultsBreaklineContainer' >
                            <hr className='searchResultsBreakline' />
                        </div>
                        <p className='searchResultsNumResults'>{this.state.books.length} Search results found for "{searchedBook}" :</p>
                        <div className='searchResultsBookCardsContainer'>
                            {books}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminSearchResults);
