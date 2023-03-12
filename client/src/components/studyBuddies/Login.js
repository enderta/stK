import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../footer/Footer";

import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = () => {
	const [validated, setValidated] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [err, setErr] = React.useState(false);
	const [passwordShown, setPasswordShown] = React.useState(false);

	const handleChange = (e) => {
		if (e.target.name === "email") {
			setEmail(e.target.value);
		} else if (e.target.name === "password") {
			setPassword(e.target.value);
		}
	};

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};
	const handleBack = (e) => {
		e.preventDefault();
		window.location.href = "/";
	};
	const login = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		e.preventDefault();
		const user = {
			email,
			password,
		};
		fetch("https://study-buddies.onrender.com/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.token) {
					localStorage.setItem("token", data.token);
					localStorage.setItem("email", data.email);
					localStorage.setItem("name", data.name);
					localStorage.setItem("id", data.id);
					window.location.href = "/createavailability";
				} else {
					alert("Wrong email or password");
					window.location.reload();
					setErr(true);
				}
			})
			.catch((err) => console.log(err));
		setValidated(true);
	};

	return (
		<div className="container row col-md-6 mt-5 mx-auto">
			<h2 style={{ fontSize: "2.2em" }} className="text-center text-light">
				LOGIN
			</h2>
			<Form
				noValidate
				validated={validated}
				onSubmit={handleChange}
				style={{ width: "50%", margin: "auto" }}
			>
				<Form.Group as={Col} className="mb-4" controlId="formBasicEmail">
					<Form.Label className="text-light">Email</Form.Label>
					<InputGroup hasValidation>
						<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
						<Form.Control
							type="email"
							placeholder="Enter email"
							name="email"
							onChange={handleChange}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please enter a valid email.
						</Form.Control.Feedback>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label style={{ color: "goldenrod" }}>
						Password <i onClick={togglePasswordVisiblity}>{eye}</i>
					</Form.Label>
					<Form.Control
						type={passwordShown ? "text" : "password"}
						placeholder="Password"
						name="password"
						onChange={handleChange}
						minLength={6}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Please provide a valid password.
					</Form.Control.Feedback>
				</Form.Group>
				<Button
					variant="outline-light"
					style={{ margin: "10px" }}
					type="submit"
					onClick={login}
				>
					Login
				</Button>
				<Button
					variant="outline-light"
					style={{ margin: "10px" }}
					type="submit"
					onClick={handleBack}
				>
					Back
				</Button>
			</Form>
			<Footer />
		</div>
	);
};

export default Login;