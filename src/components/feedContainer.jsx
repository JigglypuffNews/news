import React, { Component } from 'react';
import FeedBox from './feedBox';
import FeedControl from './feedControl';
import ConnectHackerNewsAPI from '../functions/connectHackerNewsAPI';
import SearchArticles from '../functions/searchArticles';


class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: ["graphql", "GitHub", "API", "Javascript", "HTML", "World", "open-source"]
    };
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    ConnectHackerNewsAPI()
    .then(res => SearchArticles(res, this.state.topics));
  }

  handleClick () {
    fetch(`https://newsapi.org/v2/everything?q=graphql&language=en&pagesize=100&from=2019-11-26&sortBy=popularity&apiKey=4ffc6971bc1e48fcbb98a57331bbebd4`)
    .then(res => res.json())
    .then(res => console.log(res))
  }

  render() {
    return (
      <>
        <h1>Feed Container</h1>
        <button onClick={this.handleClick}>News API</button>
        <FeedBox />
        <FeedControl />
      </>
    );
  }
}

export default FeedContainer;
