import React, { useEffect, useState } from "react";

const App = () => {
	const [email, setEmail] = React.useState("endertanver92@gmail.com");
	const [password, setPassword] = React.useState("123456");
	const  [err,setErr] = React.useState(false);
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
		fetch("https://starter-kit-uq32.onrender.com/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",

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

			{
				<button onClick={login}>Back</button>
			}
        </div>
    );
};

export default App;