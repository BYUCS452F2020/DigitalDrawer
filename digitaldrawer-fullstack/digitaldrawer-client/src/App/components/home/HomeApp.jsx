import React, {Component} from "react";
import PhotoContextProvider from "./context/PhotoContext";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import Header from "./Header";
import Item from "./Item";
import Search from "./Search";
import NotFound from "./NotFound";

export class HomeApp extends Component {
    // Prevent page reload, clear input, set URL and push history on submit
    handleSubmit = (e, history, searchInput) => {
        e.preventDefault();
        e.currentTarget.reset();
        let url = `/search/${searchInput}`;
        history.push(url);
    };

    render() {
        return (
            <PhotoContextProvider>
                <HashRouter basename="/DigitalDrawer">
                    <div className="container">
                        <Route
                            render={props => (
                                <Header
                                    handleSubmit={this.handleSubmit}
                                    history={props.history}
                                />
                            )}
                        />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to="/favorites"/>}
                            />

                            <Route path="/favorites" render={() => <Item searchTerm="winter"/>}/>
                            <Route path="/later" render={() => <Item searchTerm="later"/>}/>
                            <Route path="/fun" render={() => <Item searchTerm="color"/>}/>
                            <Route path="/business" render={() => <Item searchTerm="work"/>}/>
                            <Route
                                path="/search/:searchInput"
                                render={props => (
                                    <Search searchTerm={props.match.params.searchInput}/>
                                )}
                            />
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </HashRouter>
            </PhotoContextProvider>
        );
    }
}