import React, { useState, Component } from 'react';
import FeedBox from './feedBox';

class InterestContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            interestCounter: 0
        }
        this.leftArrowClick = this.leftArrowClick.bind(this)
        this.rightArrowClick = this.rightArrowClick.bind(this)

    }

    leftArrowClick() {
        console.log("hit left arrow", this.state.interestCounter)
        if (this.state.interestCounter > 0) {
            let temp = this.state.interestCounter - 1;
            this.setState({interestCounter: temp});
        }
    }

    rightArrowClick() {
        console.log("hit right arrow", this.state.interestCounter)
        if (this.state.interestCounter < this.props.articleArr.length) {
            let temp = this.state.interestCounter + 1;
            this.setState({interestCounter: temp});
        }
    }
    render () {
        return (
            <div>
                <h3>Based on your interest in {this.props.interest}:</h3>
                <FeedBox
                key={'newsFeedItem' + this.state.interestCounter}
                author={this.props.articleArr[this.state.interestCounter].author}
                title={this.props.articleArr[this.state.interestCounter].title}
                imageURL={this.props.articleArr[this.state.interestCounter].urlToImage}
                link={this.props.articleArr[this.state.interestCounter].url}
                summary={this.props.articleArr[this.state.interestCounter].description}
                leftArrowClick={this.leftArrowClick}
                rightArrowClick={this.rightArrowClick}
                />
            </div>
        )
    }
}


export default InterestContainer;