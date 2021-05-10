import React, { Component } from 'react';
import "./SearchResults.css";

import SearchIcon from "../../assets/icons/search_30px.png";
import BookCard from '../../components/BookCard/BookCard';

class SearchResults extends Component {
    state = {
        searchedBookName: 'book',
        books: this.props.books,
        toSearchBookName: 'book'
    }

    handleBookClicked = (bookIndex) => {
        //TODO
    }

    handleSearchBook = () => {
        //TODO
    }

    render(){

        let books = null;
        books = (
            <div className='searchResultsBookCardsContainer'>
                {this.state.books.map((book, index) => {
                    return (
                        <BookCard   key={book.id}
                                    className='searchResultsBookCard'
                                    bookName={book.bookName}
                                    bookAuthor={book.bookAuthor}
                                    bookThumbnail={book.bookThumbnail}
                                    click={this.handleBookClicked.bind(this, index)}
                                    />
                    );
                })}
            </div>
        );
        
        let searchedBookName= this.state.searchedBookName;
        
        return(
            <div className='searchResultsBackgroundSection'>
                <div className='searchResultsBackgroundFilterSection'>
                    <div className='searchResultsSectionsContainer'>
                        <div className='searchResultsHeaderSection'>
                            <div className='searchResultsHeader'>
                                <p className='searchResultsHeaderText'>Search Results</p>
                            </div>
                            <div className='searchResultsSearchBoxContainer'>
                                <div className='searchResultsSearchBox'>
                                    <input className='searchResultsSearchBoxText' type='text' name='' placeholder='Search' value={this.state.toSearchBookName} onChange={(event) => this.setState({ toSearchBookName : event.target.value })}/>
                                    <button className='searchResultsSearchBoxButton' onClick={this.handleSearchBook}>
                                        <img src={SearchIcon} alt='Search'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='searchResultsBreaklineContainer' >
                            <hr className='searchResultsBreakline' />
                        </div>
                        <p className='searchResultsNumResults'>{this.state.books.length} Search results found for "{searchedBookName}" :</p>
                        <div className='searchResultsBookCardsContainer'>
                            {books}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResults;
