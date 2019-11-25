import React, { Component} from "react";


// SAMPLE OAUTH FLOW
// https://www.linkedin.com/oauth/v2/accessToken?grant_type=client_credentials&client_id=93r29maplxr58u&client_secret=rA1z8zBOM3yrX123


class Login extends Component{
    constructor (props) {
        super(props);
        this.state = {
        }
    }

    render () {
        return (
            <>
                <h1>Login</h1>
                <button onClick={handleClick}>LOG IN TO LINKEDIN</button>
            </>
        )
    }
}

export default Login;