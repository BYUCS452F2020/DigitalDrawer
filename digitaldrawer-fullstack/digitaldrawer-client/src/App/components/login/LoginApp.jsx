import React, { useState, useEffect } from "react";
import "../../App.scss";
import { Login, Register } from ".";

export const LoginApp = () => {
    const [isLoginActive, setIsLoginActive] = useState(1);

    let current = isLoginActive ? "Register" : "Login";
    let currentActive = isLoginActive ? "Login" : "Register";

    let rightSide;
    useEffect(() => {
        rightSide.classList.add("right");
    }, []);

    const handleActiveState = () => {
        if (isLoginActive) {
            rightSide.classList.remove("right");
            rightSide.classList.add("left");
        } else {
            rightSide.classList.remove("left");
            rightSide.classList.add("right");
        }

        setIsLoginActive(!isLoginActive);
    };

    return (
        <div className="App">
            <div className="login">
                <div className="container">
                    {isLoginActive && <Login containerRef={(ref) => (current = ref)} />}
                    {!isLoginActive && (
                        <Register containerRef={(ref) => (current = ref)} />
                    )}
                </div>
                <RightSide
                    current={current}
                    currentActive={currentActive}
                    containerRef={(ref) => (rightSide = ref)}
                    onClick={handleActiveState.bind(this)}
                />
            </div>
        </div>
    );
};

const RightSide = (props) => {
    return (
        <div
            className="right-side"
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    );
};
