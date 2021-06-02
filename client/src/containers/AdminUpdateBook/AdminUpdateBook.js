import React, { Component } from 'react';
import "../AdminAddBook/AdminAddBook.css";

import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'

class AdminUpdateBook extends Component {
    state = {
        oldBook: this.props.book,
        bookname: this.props.book.bookname,
        author: this.props.book.author,
        publishingyear: this.props.book.publishingyear,
        publisher: this.props.book.publisher,
        subject: this.props.book.subject,
        category: this.props.book.category,
        language: this.props.book.language,
        coverURL: this.props.book.coverURL,
        errorMessage: '',
        errorVisible: 'none'
    }

    handleUpdateBook = () => {
        //TODO
    }

    handleDeleteBook = () => {
        //TODO
    }

    render(){
        return(
            <div className='adminAddBookBackgroundSection'>
                <div className='adminAddBookBackgroundFilterSection'>
                    <div className='adminUpdateBookSectionsContainer'>
                        <div className='adminAddBookSection'>
                            <p className='adminAddBookSectionHeader'>Update Book</p>
                            <div className='adminAddBookWrapper'>
                            <div className='adminAddBookCoverSection'>
                                    <div className='adminAddBookThumbnailWrapper'>
                                        <img src={this.state.oldBook.coverURL} className='adminAddBookThumbnail' alt=''/>
                                    </div>
                                    <p className='adminAddBookCoverLabel'>Old Cover Preview </p>
                                </div>
                                <div className='adminAddBookVerticalBreakline'></div>
                                <div className='adminAddBookCoverSection'>
                                    <div className='adminAddBookThumbnailWrapper'>
                                        <img src={this.state.coverURL} className='adminAddBookThumbnail' alt=''/>
                                    </div>
                                    <p className='adminAddBookCoverLabel'>New Cover Preview </p>
                                </div>
                                <div className='adminAddBookVerticalBreakline'></div>
                                <table className='adminAddBookInputTable'>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>Name of Book: </p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.bookname} 
                                                    onChange={(event) => this.setState({bookname: event.target.value})}  
                                                    placeholder='Name of Book' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>Author(s): </p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.author} 
                                                    onChange={(event) => this.setState({author: event.target.value})}  
                                                    placeholder='Author(s) of Book' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>Year of Publication: </p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type="number" 
                                                    min="1900" max="2022"
                                                    required value={this.state.publishingyear} 
                                                    onChange={(event) => this.setState({publishingyear: event.target.value})}  
                                                    placeholder='Year of Publication (YYYY)' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>Publisher: </p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.publisher} 
                                                    onChange={(event) => this.setState({publisher: event.target.value})}  
                                                    placeholder='Publisher' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>Category: </p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.category} 
                                                    onChange={(event) => this.setState({category: event.target.value})}  
                                                    placeholder='Category' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>Subject: </p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.subject} 
                                                    onChange={(event) => this.setState({subject: event.target.value})}  
                                                    placeholder='Subject' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='adminAddBookInputLabel'>Language: </p>
                                            </td>
                                            <td>
                                                <input  className='adminAddBookInputText' 
                                                        list="languages"
                                                        required value={this.state.language} 
                                                        onChange={(event) => this.setState({language: event.target.value})}  
                                                        placeholder='Language' />
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
                                                <p className='adminAddBookInputLabel'>URL of the Cover: </p>
                                            </td>
                                            <td>
                                            <input  className='adminAddBookInputText' 
                                                    type='text' 
                                                    name=''
                                                    required value={this.state.coverURL} 
                                                    onChange={(event) => this.setState({coverURL: event.target.value})}  
                                                    placeholder='URL of the Cover' />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='adminAddBookErrorMessage' style={{ display: this.state.errorVisible}}>{this.state.errorMessage}</div>
                            <div className='adminUpdateBookButtonsContainer'>
                                <button className='adminUpdateBookDeleteButton' onClick={this.handleDeleteBook}>
                                    <FaTrash 
                                        color="#ffffff" 
                                        size={24}/>
                                    &nbsp;
                                    Delete Book
                                </button>
                                <button className='adminUpdateBookUpdateButton' onClick={this.handleUpdateBook}>
                                    <FaEdit  
                                        color="#ffffff" 
                                        size={24}/>
                                    &nbsp;
                                    Update Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminUpdateBook;