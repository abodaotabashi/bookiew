import React, { Component } from 'react';
import './StarRating.css';
import { FaStar } from 'react-icons/fa'

class StarRating extends Component {
    state = {
        rating: (this.props.userRating === null ? 0 : this.props.userRating),
        hover: 0
    }

    handleReviewRated = (ratingValue) => {
        this.setState({rating: ratingValue});
        this.props.click(ratingValue);
    }

    
    render() {
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