import React, { Component} from "react";
import "./componentStyle.css";
import Logo from "../photos/loginPhoto.png";

// SAMPLE OAUTH FLOW
// https://www.linkedin.com/oauth/v2/accessToken?grant_type=client_credentials&client_id=93r29maplxr58u&client_secret=rA1z8zBOM3yrX123


class Login extends Component{
    constructor (props) {
        super(props);
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        fetch('/login')
    }

    render () {
        return (
            <div id="loginPage">
                <div id="loginBox">
                    <h1>Login</h1>
                    <button onClick={this.handleClick}>LOG IN TO LINKEDIN</button>
                </div>
                <div id="logoBox">
                    <img src={Logo} id="logoPic" height="30%" width="40%" alt="weblogo" />
                </div>
            </div>
        )
    }
}

export default Login;