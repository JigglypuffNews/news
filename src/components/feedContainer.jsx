import React, { Component } from 'react';
import FeedBox from './feedBox';
import FeedControl from './feedControl';
import ConnectHackerNewsAPI from '../functions/connectHackerNewsAPI';
import SearchArticles from '../functions/searchArticles';

class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [
        'graphql',
        'GitHub',
        'API',
        'Javascript',
        'HTML',
        'World',
        'open-source',
      ],
      articles: [],
    };
    this.leftArrowClick = this.leftArrowClick.bind(this);
    this.rightArrowClick = this.rightArrowClick.bind(this);
  }

  componentDidMount() {
    fetch(
      `https://newsapi.org/v2/everything?q=graphql&language=en&pagesize=100&from=2019-11-26&sortBy=popularity&apiKey=4ffc6971bc1e48fcbb98a57331bbebd4`
    )
      .then(res => res.json())
      .then(res => this.setState({ articles: res.articles }))
      .then(() => console.log('lol', this.state.articles));
  }

  leftArrowClick() {
    console.log('LEFT ARROW CLICKED');
  }

  rightArrowClick() {
    console.log('RIGHT ARROW CLICKED');
  }

  render() {
    const newsFeedToRender = [];
    for (let i = 0; i < this.state.articles.length; i += 1) {
      newsFeedToRender.push(
        <FeedBox
          author={this.state.articles[i].author}
          title={this.state.articles[i].title}
          imageURL={this.state.articles[i].urlToImage}
          link={this.state.articles[i].url}
          summary={this.state.articles[i].description}
          leftArrowClick={this.leftArrowClick}
          rightArrowClick={this.rightArrowClick}
        />
      );
    }

    return (
      <>
        <h1>Feed Container</h1>
        <FeedControl />
        {newsFeedToRender}
      </>
    );
  }
}

export default FeedContainer;
