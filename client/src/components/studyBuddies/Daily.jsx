import React from "react";
import SendEmail from "./SendMail";

const Daily = (props) => {

    return (
        <div>
            <div>

                <div className="container">
                    <div className="card-body">
                        <h2 className="card-text">
                            Name: {props.owner.name}
                        </h2>
                        <h2 className="card-text">
                            Send Mail: <SendEmail owner={props.owner} />
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
        </div>
    );
};

export default Daily;