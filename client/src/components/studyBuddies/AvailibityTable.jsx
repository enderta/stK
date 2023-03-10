import React from "react";
import SendEmail from "./SendMail.jsx";

const AvailibityTable = (props) => {

    return (
        <div>

            <div className="container">
                <div className="card-body">
                    <h2 className="card-text">
                       Name: {props.owner.name}
                    </h2>
                    <h2 className="card-text">
                     <SendEmail owner={props.owner} />
                    </h2>
                    <h2 className="card-text">
                      Date:  {new Date(props.owner.availability_date).toLocaleDateString()}
                    </h2>
                    <h2 className="card-text">
                       Topic: {props.owner.topic}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default AvailibityTable;