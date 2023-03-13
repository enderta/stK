import React from "react";

const Logout = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("email");
		window.location.href = "/";
	};

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Logout;