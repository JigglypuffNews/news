import React, { Component } from 'react';
import FeedBox from './feedBox';
import FeedControl from './feedControl';
import InterestContainer from './interestContainer';
import ConnectHackerNewsAPI from '../functions/connectHackerNewsAPI';
import SearchArticles from '../functions/searchArticles';
import regeneratorRuntime from "regenerator-runtime";


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
      interestCounter: 0,
      linkedinId: null
    };
    this.transmitUserInterests = this.transmitUserInterests.bind(this);
    this.displayArticlesHandle = this.displayArticlesHandle.bind(this);
    this.refetchArticles = this.refetchArticles.bind(this);
    this.removeInterest = this.removeInterest.bind(this);
  }

  componentDidMount() {
    if (this.state.profile === null) {
      fetch('/access').then(res => res.json()).then(res => {
        this.setState({ profile: res.profile, authToken: res.token, linkedinId: res.profile.id })
      })
    }
    for (let i = 0; i < this.state.userInterests.length; i += 1) {
      fetch(
        `https://newsapi.org/v2/everything?q=${this.state.userInterests[i]}&language=en&pagesize=100&from=2020-02-26&sortBy=popularity&apiKey=d0965c2624db42848af1a182d1338f13`
      )
        .then(res => res.json())
        .then(res => {
          let obj = this.state.articles;
          obj[this.state.userInterests[i]] = res.articles;
          this.setState({ articles: obj })
        })
    }
  }

  refetchArticles(tempArr) {
    this.setState({articles: {}})
    for (let i = 0; i < tempArr.length; i += 1) {
      fetch(
        `https://newsapi.org/v2/everything?q=${tempArr[i]}&language=en&pagesize=100&from=2020-02-26&sortBy=popularity&apiKey=d0965c2624db42848af1a182d1338f13`
      )
      .then(res => res.json())
      .then(res => {
        let obj = this.state.articles;
        obj[tempArr[i]] = res.articles;
        this.setState({ articles: obj })
      })
    }
  }

  displayArticlesHandle() {
    if (this.state.displayArticles === false) {
      this.setState({displayArticles: true});
    }
    else this.setState({displayArticles: false});
  }

  async transmitUserInterests(interests) {
    let tempArr = [...this.state.userInterests, interests]
    await this.refetchArticles(tempArr);
    this.setState({ userInterests: tempArr });
    // fetch('/userInterests', {
    //   method: 'POST',
    //   headers: { 'Content-type': 'Application/json' },
    //   body: JSON.stringify(this.state.userInterests),
    // });
  }

  async removeInterest(interest) {
    let tempArr = [];
    for (let i = 0; i < this.state.userInterests.length; i += 1) {
      if (this.state.userInterests[i] !== interest) {
        tempArr.push(this.state.userInterests[i]);
      }
    }
    await this.refetchArticles(tempArr);
    this.setState({ userInterests: tempArr })
  }

  render() {
    const newsFeedToRender = [];
    console.log("ARTICLES", this.state.articles, "INTERESTS", this.state.userInterests)
    if(this.state.displayArticles && Object.keys(this.state.articles).length === this.state.userInterests.length) {
      for (let i = 0; i < this.state.userInterests.length; i += 1) {
        newsFeedToRender.push(
          <InterestContainer
            linkedinId={this.state.linkedinId}
            removeInterest={this.removeInterest}
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
        <div id="loadArticlesButton">
          <button onClick={this.displayArticlesHandle}>Click to load articles</button>
        </div>
        <div id="centeredDiv">
          {newsFeedToRender}
        </div>
      </>
    );
  }
}

export default FeedContainer;
