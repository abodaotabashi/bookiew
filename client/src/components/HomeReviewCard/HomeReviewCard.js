import React from 'react';
import './HomeReviewCard.css';


const HomeReviewCard = (props) => {
    return(
        <div className='reviewCardContainer'>
            <div className='reviewCardBookThumbnailWrapper'>
                <img src={props.bookThumbnail} className='reviewCardBookThumbnail' alt='bookThumbnail'/>
            </div>
            <div className='reviewCardWrapper'>
                <div className='reviewCardBookName'>
                    <p>{props.bookName}</p>
                </div>
                <div className='reviewCardBookAuthor'>
                    <p>{props.bookAuthor}</p>
                </div>
                <div className='reviewCardBreaklineContainer' >
                    <hr className='reviewCardBreakline' />
                </div>
                <div className='reviewCardReviewerContainer'>
                    <div className='reviewCardReviewerWrapper'>
                        <div className='reviewCardReviewerIconWrapper'>
                            <img src={props.reviewerIcon} className='reviewCardReviewerIcon' alt='reviewer'/>
                        </div>
                        <div className='reviewCardReviewerName'>{props.reviewerName}</div>
                    </div>
                    <div className='reviewCardReviewDate'>
                        <p>Published On {props.reviewDate}</p>
                    </div>
                </div>
                <div className='reviewCardReviewText'>
                    <p>{props.reviewText}</p>
                </div>
            </div>
            
        </div>
    );
}

export default HomeReviewCard;