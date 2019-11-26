import React, { Component } from 'react';
import FeedBox from './feedBox';
import FeedControl from './feedControl';
import ConnectHackerNewsAPI from '../functions/connectHackerNewsAPI';
import SearchArticles from '../functions/searchArticles';


class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ConnectHackerNewsAPI()
    .then(res => SearchArticles(res));
  }

  render() {
    return (
      <>
        <h1>Feed Container</h1>

        <FeedBox />
        <FeedControl />
      </>
    );
  }
}

export default FeedContainer;
