import React, { useEffect, useState } from "react";

const App = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
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

			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="card mb-4 shadow-sm" style={{
							background: "darkgoldenrod",
						}
						}>
							<div className="card-body">
								<h1>Login</h1>
								<form>
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleEmail} />
										<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
										<label htmlFor="password">Password</label>
										<input type="password" className="form-control" id="password" placeholder="Password" onChange={handlePassword} />
										<div className="form-group form-check">
											<input type="checkbox" className="form-check-input" id="exampleCheck1" />
											<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
										</div>
										<button type="submit" className="btn btn-primary" onClick={login}>Submit</button>
										<button type="submit" className="btn btn-primary" onClick={handleBack}>Back</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    );
};

export default App;