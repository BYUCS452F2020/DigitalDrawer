import React from 'react';
import loginImg from './login.svg'

import comms from '../../client_comms.js'
console.log(comms)

export class Register extends React.Component {
    register() {
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;
        const firstname = null;
        const lastname = null;
        const email = document.getElementById("register-email").value;
        const type = null;
        comms.postRegister(username, password, firstname, lastname, email, type);
    }

    render() {
        return (
            <div className="base-container">
                <div className="header">Register for DigitalDrawer</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}  alt="alt"/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="register-username" type="text" name="username" placeholder="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="register-email" type="email" name="email" placeholder="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="register-password" type="password" name="password" placeholder="password" />
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" onClick={this.register} className="btn">Register</button>
                    </div>
                </div>
            </div>
        )
    }
}