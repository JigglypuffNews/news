import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Login from './components/login.jsx';
import FeedContainer from './components/feedContainer.jsx';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
    this.loginStateUpdate = this.loginStateUpdate.bind(this);
  }

  loginStateUpdate() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    let displayElement = null;
    if (!this.state.isLoggedIn) {
      displayElement = <Login loginStateUpdate={this.loginStateUpdate} />;
      console.log(displayElement);
    } else displayElement = <FeedContainer />;

    return <div>{displayElement}</div>;
    /* <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/main" component={FeedContainer} />
        </Switch>
      </BrowserRouter> */
  }
}

export default App;
