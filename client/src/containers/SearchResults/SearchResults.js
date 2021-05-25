import React, { Component } from 'react';
import "./SearchResults.css";

import SearchIcon from "../../assets/icons/search_30px.png";
import BookCard from '../../components/BookCard/BookCard';

class SearchResults extends Component {
    state = {
        searchedBookName: this.props.searchedBook,
        books: this.props.books,
        toSearchBookName: this.props.searchedBook
    }

    handleBookClicked = (bookIndex) => {
        //TODO
    }

    handleSearchBook = () => {
        //TODO
    }
    componentWillReceiveProps(props) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (props.books !== this.state.books) {
          this.setState({ 
            searchedBookName: this.props.searchedBook,
            books: this.props.books,
            toSearchBookName: this.props.searchedBook
            });
        }
    }

    render(){
        let books = null;
       
       
           
        books = (
            <div className='searchResultsBookCardsContainer'>
                {this.state.books.map((book, index) => {
                    return (
                        
                        <BookCard   
                            key={book.id}
                            className='searchResultsBookCard'
                            bookName={book.bookName}
                            bookAuthor={book.bookAuthor}
                            bookThumbnail={book.bookCoverURL}
                            click={this.handleBookClicked.bind(this, index)}
                        />
                            
                    );
                })}
            </div>
        );
        
        let searchedBookName= this.state.searchedBookName;
        
        return(
            <div>
                       
                        <p className='searchResultsNumResults'>{this.state.books.length} Search results found for "{searchedBookName}" :</p>
                        <div className='searchResultsBookCardsContainer'>
                        
                            {books}
                        </div>
                    
            </div>
        );
    }
}

export default SearchResults;
