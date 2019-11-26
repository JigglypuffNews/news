import React, { Component } from 'react';
import FeedBox from './feedBox';
import FeedControl from './feedControl';
import ConnectHackerNewsAPI from '../functions/connectHackerNewsAPI';

class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ConnectHackerNewsAPI().then(res => console.log(res));
    // console.log('article ids', articleIDs);
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
