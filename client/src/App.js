import React, { useEffect, useState } from "react";

const App = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const  setErr = React.useState(false);
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleBack = (e) => {
		e.preventDefault();
		window.location.href = "/";
	};
	const login = (e) => {
		e.preventDefault();
		const user = {
			email,
			password,
		};
		fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Autorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjc4NDcyNjkzLCJleHAiOjE2Nzg4MzI2OTN9.XFtFA0dVINwaZ1zjd_yoJaxI7af90yR2fmF3UI-QsQc",

			},
			body: JSON.stringify(user),
		}).then((res) => res.json())
			.then((data) => {
				if (data.token) {

					localStorage.setItem("token", data.token);
					localStorage.setItem("email", email);
					localStorage.setItem("id", data.id);
					window.location.href = "/availability";
				} else {
					alert("Wrong email or password");
					setErr(true);
				}
			})
			.catch((err) => console.log(err));
	};
	console.log(localStorage);

	return (
        <div>
ender
        </div>
    );
};

export default App;