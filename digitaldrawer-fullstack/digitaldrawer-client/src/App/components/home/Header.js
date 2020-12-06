import React from "react";
import Form from "./Form";
import Navigation from "./Navigation";
import Jumbotron from "react-bootstrap/Jumbotron";

const Header = ({history, handleSubmit}) => {
    return (
        <Jumbotron>
            <div>
                <h1 className="digitaldrawer-head">DigitalDrawer</h1>
                <h4 className="head_descrip">Manually add bookmarks with the "+Add" button below or install the DigitalDrawer plugin for browser integration! </h4>
                <h4 className="head_descrip">Search below for bookmarks you've already saved or bookmarks others have saved!</h4>
                <Form history={history} handleSubmit={handleSubmit}/>
                <Navigation/>
            </div>
        </Jumbotron>
    );
};

export default Header;
