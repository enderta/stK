import React from "react";

const SendMail = (props) => {
	const [email] = React.useState(localStorage.getItem("email"));
	const [to] = React.useState(props.owner.email);
	const [subject] = React.useState("Study Buddy");
	const [message] = React.useState("Hello, I would like to study with you.");

	const sendEmail = async (e) => {
		e.preventDefault();
		const data = {
			email,
			to,
			subject,
			message,
		};
		if (email === "" || to === "" || subject === "" || message === "") {
			alert("Please fill all fields");
		} else {
			const response = await fetch("http://localhost:5000/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			console.log(response);
			const content = await response.json();
			console.log(content);
			alert("Email sent successfully");
			window.location.reload();
		}
	};

	return (
		<div>
			<button className="btn btn-outline-dark" onClick={sendEmail}>
				Notify by Email
			</button>
		</div>
	);
};

export default SendMail;