import React, { Component } from 'react';
import FeedBox from './feedBox';
import FeedControl from './feedControl';
import InterestContainer from './interestContainer';
import ConnectHackerNewsAPI from '../functions/connectHackerNewsAPI';
import SearchArticles from '../functions/searchArticles';


class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayArticles: false,
      articles: {},
      userInterests: ['graphql', 'javascript', 'microsoft'],
      profile: null,
      authToken: null,
      controlBox: null,
      interestCounter: 0
    };
    this.transmitUserInterests = this.transmitUserInterests.bind(this);
    this.displayArticlesHandle = this.displayArticlesHandle.bind(this);
  }

  componentDidMount() {
    fetch('/access').then(res => res.json()).then(res => {
      console.log("profile", res.profile)
      this.setState({profile: res.profile, authToken: res.token })
    })
    for (let i = 0; i < this.state.userInterests.length; i += 1) {
      fetch(
        `https://newsapi.org/v2/everything?q=${this.state.userInterests[i]}&language=en&pagesize=100&from=2019-11-26&sortBy=popularity&apiKey=4ffc6971bc1e48fcbb98a57331bbebd4`
      )
        .then(res => res.json())
        .then(res => {
          let obj = this.state.articles;
          obj[this.state.userInterests[i]] = res.articles;
          this.setState({ articles: obj })
        })
        .then((res) => console.log('lol', this.state.articles));
    }
  }

  displayArticlesHandle() {
    if (this.state.displayArticles === false) {
      this.setState({displayArticles: true});
    }
    else this.setState({displayArticles: false});
  }

  transmitUserInterests(interests) {
    this.setState({ userInterests: [...this.state.userInterests, interests] });
    console.log('this is state', this.state.userInterests);
    // fetch('/userInterests', {
    //   method: 'POST',
    //   headers: { 'Content-type': 'Application/json' },
    //   body: JSON.stringify(this.state.userInterests),
    // });
  }

  render() {
    const newsFeedToRender = [];
    if(this.state.displayArticles) {
      for (let i = 0; i < this.state.userInterests.length; i += 1) {
        newsFeedToRender.push(
          <InterestContainer
            interest={this.state.userInterests[i]}
            articleArr={this.state.articles[this.state.userInterests[i]]}
          />
        );
      }
    }
    let feedControlRender = []
    if (this.state.profile) {
      feedControlRender.push(<FeedControl
          profile={this.state.profile}
          sendInterests={this.transmitUserInterests}
          userInterests={this.state.userInterests}
        />)
    }
    return (
      <>
        {feedControlRender}
        <button onClick={this.displayArticlesHandle}>Click to load articles</button>
        {newsFeedToRender}
      </>
    );
  }
}

export default FeedContainer;
