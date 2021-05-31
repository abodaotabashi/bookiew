import React from 'react';
import './BookCard.css';

const BookCard = (props) => {
    return(
        <div className='bookCardContainer' onClick={props.click}>
            <div className='bookCardThumbnailWrapper'>
                <img src={props.bookThumbnail} className='bookCardThumbnail' alt='bookThumbnail'/>
            </div>
            <div className='bookCardName'>
                <p>{props.bookName}</p>
            </div>
            <div className='bookCardAuthor'>
                <p>{props.bookAuthor}</p>
            </div>
        </div>
    );
}

export default BookCard;