import React from "react";
import NavBar from "./NavBar";

const UserProfile = () => {
    console.log(localStorage);
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className={"container"}>
                <div className={"card-body"}>
                    <h2 className={"card-text"}>Name: {localStorage.getItem("name")}</h2>
                    <h2 className={"card-text"}>Email: {localStorage.getItem("email")}</h2>
                    <img className={"card-img-top"} src="https://visualpharm.com/assets/448/User-595b40b85ba036ed117dbd22.svg" alt={"profile"} />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;