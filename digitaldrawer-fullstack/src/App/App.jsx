import './App.scss';
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
// import Home from './components/home/Home';
import { LandingApp } from "./components/landing/LandingApp";
import { LoginApp } from "./components/login/LoginApp";


class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={LoginApp}/>
                    <Route exact path='/home' component={LandingApp}/>
                </Switch>
            </div>
        )
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;
