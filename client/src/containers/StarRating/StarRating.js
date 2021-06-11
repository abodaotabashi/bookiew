import React, { Component } from 'react';
import axios from 'axios';

import { FaStar } from 'react-icons/fa';
import './StarRating.css';

class StarRating extends Component {
    state = {
        reviewID: this.props.reviewID,
        rating: 0,
        hover: 0
    }

    handleReviewRated = (ratingValue) => {
        this.setState({rating: ratingValue});
        this.props.click(ratingValue);
    }

    handleGetRatingOfUser = async () => {
        const userID = localStorage.getItem('userID');
        const result  = await axios.post("http://localhost:3000/getRatingOfUser", {
            userID: userID,
            reviewID: this.state.reviewID
        });
        if (result.data.response) { 
            this.setState({rating: result.data.rating})
            console.log(this.state.rating);
        } else {
            console.log('no rating for you');
        }
    }

    render() {
        if (this.state.rating === 0) {
            this.handleGetRatingOfUser(); 
        }

        return(
            <div className='starRatingContainer'>
                {[ ...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return(
                        <label key={index}>
                            <input  className='starRatingRadio' 
                                    type="radio" 
                                    name="rating" 
                                    value={this.state.rating}
                                    onClick={this.handleReviewRated.bind(this, ratingValue)}/>
                            <FaStar className='starRatingStar' 
                                    color={ratingValue <= (this.state.hover || this.state.rating) ? "#ffc107" : "#55525259"} 
                                    size={24}
                                    onMouseEnter={() => this.setState({hover: ratingValue})}
                                    onMouseLeave={() => this.setState({hover: null})}/>
                        </label>
                    ) 
                })}
            </div>
        )
    }
}

export default StarRating;