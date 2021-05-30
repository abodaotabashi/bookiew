import React from 'react';
import './BookCard.css';
import {useTranslation} from "react-i18next";

const BookCard = (props) => {
    const {t} = useTranslation()
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
            <div class="button"><a onClick={()=> console.log("to be reviewed!")}>{t('book_card.review')}</a></div>
        </div>
    );
}

export default BookCard;