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
        this.postArticle = this.postArticle.bind(this)

    }

    leftArrowClick() {
        if (this.state.interestCounter > 0) {
            let temp = this.state.interestCounter - 1;
            this.setState({interestCounter: temp});
        }
    }

    rightArrowClick() {
        if (this.state.interestCounter < this.props.articleArr.length) {
            let temp = this.state.interestCounter + 1;
            this.setState({interestCounter: temp});
        }
    }

    postArticle(article) {
        console.log("hit postarticle client", article)
        fetch('/postArticle', {
            headers: {"Content-type":"application/json"},
            method: "POST",
            body: article,
        })
    }

    render () {
        return (
            <div className="interestContainerComp">
                <h3>Based on your interest in {this.props.interest}:</h3>
                <FeedBox
                postArticle={this.postArticle}
                interest={this.props.interest}
                linkedinId={this.props.linkedinId}
                key={'newsFeedItem' + this.state.interestCounter}
                author={this.props.articleArr[this.state.interestCounter].author}
                title={this.props.articleArr[this.state.interestCounter].title}
                imageURL={this.props.articleArr[this.state.interestCounter].urlToImage}
                link={this.props.articleArr[this.state.interestCounter].url}
                summary={this.props.articleArr[this.state.interestCounter].description}
                leftArrowClick={this.leftArrowClick}
                rightArrowClick={this.rightArrowClick}
                />
                <button onClick={() => this.props.removeInterest(this.props.interest)}>Remove {this.props.interest} from interests.</button>
            </div>
        )
    }
}


export default InterestContainer;