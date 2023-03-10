import React from "react";
import Button from "react-bootstrap/Button";

const ResultPage = (props) => {
 const handleBack=(e)=>{
     e.preventDefault();
     window.location.href = "/availability";
 };

    return (
        <div>
            <h1 style={{ color:"white" }}>
                There is no available trainee for this date. Please try another date.
            </h1>
            <div>
                <Button onClick={handleBack} variant="primary" type="submit">
                    Back
                </Button>


            </div>
        </div>
    );
};

export default ResultPage;