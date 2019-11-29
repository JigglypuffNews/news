import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Login from './components/login.jsx';
import FeedContainer from './components/feedContainer.jsx';

import './App.css';

const App = () => {

    return (<div><FeedContainer /></div>);
}

export default App;
