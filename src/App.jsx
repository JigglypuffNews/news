import React, { Component} from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

import Login from "./components/login.jsx"
import FeedContainer from "./components/feedContainer.jsx"

import "./App.css";

class App extends Component{
    constructor (props) {
        super(props);
        this.state = {
        }
    }

    render () {
        return (
            <BrowserRouter>
            <div>
                <Link to="/"><button>Login</button></Link>
                <Link to="/home"><button>Main Page</button></Link>
            </div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={FeedContainer} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;