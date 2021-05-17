import React from 'react';
import './Comment.css';


const Comment = (props) => {
    return(
        <div className='commentContainer'>
            <div className='commentCommenterContainer'>
                <div className='commentCommenterWrapper'>
                    <div className='commentCommenterIconWrapper'>
                        <img src={props.commenterIcon} className='commentCommenterIcon' alt='Commenter'/>
                    </div>
                    <div className='commentCommenterName'>{props.commenterName}</div>
                </div>
                <div className='commentDate'>
                    <p>{props.commentDate}</p>
                </div>
            </div>
            <div className='commentText'>
                <p>{props.commentText}</p>
            </div>
        </div>
    );
}

export default Comment;