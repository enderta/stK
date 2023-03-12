import React from "react";
import "./Heading.css";

function HeadingHome (props) {
    return <h1 className="header">{props.name}</h1>;
}

export default HeadingHome;