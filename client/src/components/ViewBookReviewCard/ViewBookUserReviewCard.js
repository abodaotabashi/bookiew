import React from 'react';
import './ViewBookUserReviewCard.css';

import UserIcon from "../../assets/icons/user.png";
import { FaStar } from 'react-icons/fa';
import {useTranslation} from "react-i18next";

const ViewBookUserReviewCard = (props) => {
    const {t} = useTranslation();
    return(
        <div className='viewBookUserReviewWrapper' onClick={props.click}>
            <div className='viewBookUserReviewerContainer'>
                <div className='viewBookUserReviewerWrapper'>
                    <div className='viewBookUserReviewerIconWrapper'>
                        <img src={(props.reviewerIcon === '' || typeof(props.reviewerIcon) === 'undefined') ? UserIcon : props.reviewerIcon} className='viewBookUserReviewerIcon' alt='reviewer'/>
                    </div>
                    <div className='viewBookUserReviewerName'>{props.reviewerName}</div>
                </div>
                <div className='viewBookUserReviewDate'>
                    <p>{t('home_review_card.pub_on')}{props.reviewDate}</p>
                </div>
            </div>
            <div className='viewBookUserReviewText'>
                {props.reviewText}
            </div>
            <div className='viewBookUserReviewRatingCommentSection'>
                <div className='viewBookUserReviewShowCommentsWrapper'>
                    <p className='viewBookUserReviewLabel'>{t('home_review_card.comments')} &nbsp;{props.reviewComments.length}</p>
                </div>
                <div className='viewBookUserReviewRatingWrapper'>
                    <p className='viewBookUserReviewLabel'>{props.reviewRating}</p>
                    <FaStar className="viewBookUserReviewStar"
                            color="#ffc107" 
                            size={24}/>
                </div>
            </div>
        </div>
    );
}

export default ViewBookUserReviewCard;