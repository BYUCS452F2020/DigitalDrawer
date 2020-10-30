import React from "react";
import Form from "./Form";
import Navigation from "./Navigation";
import Jumbotron from "react-bootstrap/Jumbotron";

const Header = ({history, handleSubmit}) => {
    return (
        <Jumbotron>
            <div>
                <h1 className="digitaldrawer-head">DigitalDrawer</h1>
                <Form history={history} handleSubmit={handleSubmit}/>
                <Navigation/>
            </div>
        </Jumbotron>
    );
};

export default Header;
