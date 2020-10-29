import React from 'react';
import loginImg from './login.svg'

import comms from '../../client_comms.js'
console.log(comms)

export class Login extends React.Component {
    login() {
        var username = document.getElementById("login-username").value;
        var password = document.getElementById("login-password").value;
        comms.postLogin(username, password);
    }

    render() {
        return (
            <div className="base-container">
                <div className="header">Login to DigitalDrawer</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}  alt="alt"/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="login-username" type="text" name="username" placeholder="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="login-password" type="password" name="password" placeholder="password" />
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" onClick={this.login} className="btn">Login</button>
                    </div>
                </div>
            </div>
        )
    }
}