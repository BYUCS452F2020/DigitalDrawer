import React, {Component} from "react";
import PhotoContextProvider from "./context/PhotoContext";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import NotFound from "./NotFound";
import {AddBookmarkForm} from "./AddBookmarkForm";
import {CreateDrawerForm} from "./CreateDrawerForm";
import Bookmark from "./Bookmark";
import Navigation from "./Navigation";
import Footer from "./Footer";


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
                        <Route
                            render={props => (
                                <Navigation />
                            )}
                        />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to="/favorites"/>}
                            />

                            <Route path="/favorites" render={() => <Bookmark searchTerm="Mae Fah Luang" page="favorites"/>}/>
                            <Route path="/later" render={() => <Bookmark searchTerm="Grand Canyon" page="later"/>}/>
                            <Route path="/fun" render={() => <Bookmark searchTerm="Utah Arches" page="fun"/>}/>
                            <Route path="/business" render={() => <Bookmark searchTerm="Grand Teton" page="work"/>}/>
                            <Route path="/addBookmark" render={() => <AddBookmarkForm/>}/>
                            <Route path="/createDrawer" render={() => <CreateDrawerForm/>}/>
                            <Route
                                path="/search/:searchInput"
                                render={props => (
                                    <Search searchTerm={props.match.params.searchInput}/>
                                )}
                            />
                            <Route component={NotFound}/>
                        </Switch>
                        <Route
                            render={props => (
                                <Footer />
                            )}
                        />
                    </div>
                </HashRouter>
            </PhotoContextProvider>
        );
    }
}
